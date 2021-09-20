const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const {Types}= require('mongoose')
const app = express()
const socketIo = require("socket.io");
const cors = require('cors')
const http = require("http");
const Message=require('./models/Messages')
app.use(cors())
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/messages', require('./routes/messages.routes'))
app.use('/api/room', require('./routes/room.routes'))
app.use(express.json({extended: true}))
const PORT = config.get('port') || 5000


async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        const server = http.createServer(app);
        const io = socketIo(server,
            {
                cors: {
                    origin: "http://localhost:3000",
                    methods: ["GET", "POST"]
                }
            });
        io.sockets.on('connection', function (socket) {
            console.log('client connect');
            // console.log(socket.handshake.query)
            socket.join(socket.handshake.query.roomId)
            socket.emit('Hey',{hey:'hey'})
            socket.on('echo', function (data) {
                io.sockets.emit('message', data);
            });
            socket.on('sendMessage',async data=>{
                console.log(data)
                const {
                        message,
                        userId,
                        roomId,
                        nowTime,
                        name
                    } =data
                    try {
                        const m = new Message({message, userId,roomId,sentDate: nowTime,name});
                        await m.save()
                        // const messages = await Message.find(message)
                        socket.to(roomId).emit( "sentMessage" ,m)

                    }catch (e) {
                        console.log(`error: ${e.message}`)
                    }
            })
            socket.on('disconnect',()=>{console.log('disconnected')})
        });
        // app.use(function (req, res, next) {
        //     req.io = io;
        //     next();
        // });
        server.listen(PORT, () => console.log(`app started on port ${PORT}...`))
        // const io = socketIo(expressServer)
        // app.set('io', io);
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

