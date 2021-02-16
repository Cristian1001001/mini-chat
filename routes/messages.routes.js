const {Types}= require('mongoose')
const {Router} = require('express')
const config=require('config')
const Message=require('../models/Messages')
const router=Router()
const bodyParser= require('body-parser')

const jsonParser= bodyParser.json()
// api/room/
router.get(
    '/allMessages',
    jsonParser,
    async (req, res) =>{
        try {
            const {roomId, page} = JSON.parse(req.query.scroll)
            const limit =20
            const messages = await Message.find({'roomId': roomId}).limit(limit).skip((page - 1) * limit).sort({sentDate: 'descending'})
            const count = await Message.countDocuments();
            res.json(
                {
                    messages,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page
                }
            );
        }catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something went wrong'})

        }
    }
)

module.exports=router
