const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')
const {check, validationResult}= require('express-validator')
const User=require('../models/User')
const router=Router()
const bodyParser= require('body-parser')

const jsonParser= bodyParser.json()
// /api/auth/register
router.post(
    '/register',
    jsonParser,
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password is too short')
            .isLength({min:6}),
        check('name', 'Enter a valid name')
            .isLength({min:2}),
    ],
    async (req,res)=>{
        try{
            const errors= validationResult(req.body)
            console.log('errors', req.body)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data'
                })
            }

            const {email, password, name}=req.body
            const candidate= await User.findOne({email})

            if(candidate){
                return  res.status(400).json({message: 'This user is already registered'})
            }

            const hashedPass = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPass,name})

            await user.save()
            // res.status(201).json({message: 'User has been added'})
            const loggedUser= await User.findOne({email})
            const token= jwt.sign(
                { userId: loggedUser.id,
                        userName: loggedUser.name
                },
                config.get('jwtSecret'),
                {expiresIn: '2000h'}
            )
            res.status(201).json({token, userId: user.id,userName: user.name})

        }catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }

    })

// /api/auth/lgin
router.post(
    '/login',
    jsonParser,
    [
        check('email', 'Incorrect user or pass').isEmail(),
        check('password','Incorrect user or pass' ).exists()
    ],
    async (req,res)=>{
        try{
            const errors= validationResult(req.body)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect user or pass'
                })
            }

            const {email, password} = req.body
            const user= await User.findOne({email})
            if (!user){
                return res.status(400).json({message: 'No such user'})
            }
            const isMatch= await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({message: 'User or password is wrong'})
            }

            const token= jwt.sign(
                { userId: user.id,
                    userName: user.name
                },
                config.get('jwtSecret'),
                {expiresIn: '2000h'}
            )
            res.json({token, userId: user._id,userName: user.name})
        }catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    })

module.exports=router
