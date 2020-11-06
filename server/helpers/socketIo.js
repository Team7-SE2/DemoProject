var socketio_singleton;

module.exports = function () {
    if (!socketio_singleton)
        socketio_singleton = require('socket.io')();
    return socketio_singleton;
}