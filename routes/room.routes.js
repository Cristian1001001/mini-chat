const {Types}= require('mongoose')
const {Router} = require('express')
const config=require('config')
const jwt=require('jsonwebtoken')
const Room=require('../models/Room')
const router=Router()
const bodyParser= require('body-parser')

const jsonParser= bodyParser.json()
// api/room/
router.post(
    '',
    jsonParser,
    async (req,res)=>{
        try{
            const {userId,room,lastUpdate}=req.body
            const possibleRoom= await Room.findOne({name: room})
            if(possibleRoom){
                if(possibleRoom.users.includes(userId))
                {
                    console.log(possibleRoom)
                    return res.status(201).json(possibleRoom)
                }
                await possibleRoom.updateOne({$push: {userId}})
                return res.status(201).json({possibleRoom})
            }
            const newRoom = new Room({users:userId, name:room, lastUpdate})
            await newRoom.save()
            const roomDetails = await Room.findOne({name: room})
            return res.status(201).json({roomDetails})
        }catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    }
)

router.get(
    '/yourRooms',
    jsonParser,
        async (req, res) =>{
            const token = req.headers.authorization.split(' ')[1]
            req.user = jwt.verify(token, config.get('jwtSecret'))
        try {
                console.log(req.user.userId)
            console.log(typeof req.user.userId)
            const rooms = await Room.find({users: `${req.user.userId}`})
            res.status(201).json(rooms)
        }catch (e) {
                console.log(e)
            res.status(500).json({message: 'Something went wrong'})

        }
        }
)

module.exports=router
