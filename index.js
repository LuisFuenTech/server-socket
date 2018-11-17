const express = require('express');
const app = express();
const path = require('path');

//Settings
app.set('port', process.env.PORT || 3000);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
    console.log(`Server\'s working on port ${app.get('port')}`);
});

//Websockets
const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    //Recibe datos y reenvía
    socket.on('chat:msg', (data) => {
        io.sockets.emit('server:msg', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('server:type', data);
    });
});

