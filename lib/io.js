'use strict';

const io = require('socket.io')();

io.on('connection', (socket) => {
    socket.on('comment-submitted', () => {
        io.sockets.emit('update-comments');
    });

    socket.on('comment-deleted', () => {
        io.sockets.emit('update-comments');
    });
});

module.exports = io;
