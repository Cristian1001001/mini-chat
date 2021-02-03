const express = require('express')
const config = require('config')
const mongoose=require('mongoose')
const socketIo = require("socket.io");


const app=express()
const cors = require('cors')
app.use(cors())
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/messages', require('./routes/messages.routes'))
app.use('/api/room', require('./routes/room.routes'))
app.use(express.json({ extended: true }))
const PORT=config.get('port') || 5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUrl'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
       const server = app.listen(PORT, ()=>console.log(`app started on port ${PORT}...`))
        const io = socketIo.(server)
        io.sockets.on('connection', function (socket) {
            console.log('client connect');
            socket.on('echo', function (data) {
                io.sockets.emit('message', data);
            });
        });
        app.use(function(req, res, next) {
            req.io = io;
            next();
        });
        // const io = socketIo(expressServer)
        // app.set('io', io);
    }catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

