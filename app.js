const express = require('express')
const socket = require('socket.io')
const app = express();

app.use(express.static('public'));

app.get('/',(req, res) => {
        res.sendFile(__dirname + '/index.html');
})

const server = app.listen(3000);

const io = socket(server)

io.on('connection',(socket) => {
        socket.on('chatmessage',(msg) => {
                socket.broadcast.emit('message',msg);
        })
        socket.on('welcome',(user) => {
                socket.broadcast.emit('welcome', user);
        })
})