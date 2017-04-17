'use strict';

const io = require('socket.io')();

io.on('connection', (socket) => {
    socket.on('post-submitted', () => {
        io.sockets.emit('update-posts');
    });

    socket.on('post-deleted', () => {
        io.sockets.emit('update-posts');
    });

    socket.on('post-edited', () => {
        io.sockets.emit('update-posts');
    });

    socket.on('post-event', () => {
        io.sockets.emit('update-posts');
    });

    socket.on('comment-submitted', () => {
        io.sockets.emit('update-comments');
    });

    socket.on('comment-deleted', () => {
        io.sockets.emit('update-comments');
    });

    socket.on('like-event', () => {
        io.sockets.emit('update-likes');
    });
});

module.exports = io;
