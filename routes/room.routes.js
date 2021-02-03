const {Router} = require('express')
// const jwt=require('jsonwebtoken')
// const config=require('config')
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
                    return res.status(201).json({possibleRoom})
                }
                await possibleRoom.updateOne({$push: {userId}})
                return res.status(201).json({possibleRoom})
            }
            const newRoom = new Room({users:userId, name:room, lastUpdate})
            await newRoom.save()
            return res.status(201).json({newRoom})
        }catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    }
)

module.exports=router
