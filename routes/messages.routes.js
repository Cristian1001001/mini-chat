const {Router} = require('express')
const router=Router()
const bodyParser = require('body-parser');
const Messages=require('../models/Messages')

router.get(
    '',
    async (req, res, next) => {
        console.log('here')
    console.log(req.app.locals.io) //io object
    const io = req.app.locals.io
    io.emit('sendMessage', { my: 'data' }) //emit to everyone
    res.send("OK")
});


module.exports = router;
