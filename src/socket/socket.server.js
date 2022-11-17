const io = require('socket.io');

class SocketServer {
    constructor() {
        this.server = null;
        this.onlineUsers = [];
        this.currentUser = {};
    }

    initialize(server) {
        this.server = io(server, {
            cors: {
                origin: 'http://localhost:4200',
                methods: ["GET", "POST"]
            }
        });
        this.server.on('connection', (socket) => {
            console.log('A new user has entered the chat')
            this.bindEvents(socket);
            // socket.on('disconnect', () => {
            //     console.log('disconnected my man')
            //     this.removeUserFromOnline(this.currentUser.id);
            // });
        })
    }

    bindEvents(socket) {
        socket.on('sendMessage', (data) => {
            socket.broadcast.emit('messageFromServer', data);
        })
        socket.on('userDetails', (data) => {
            this.currentUser = data;
            const check = this.checkIfUserOnline(data.id);
            if (check) {
                this.onlineUsers.push({ id: data.id, name: data.name })
            }
            socket.emit('usersOnline', this.onlineUsers)
        })
        socket.on('removeUser', (data) => {
            this.currentUser = data;
            this.removeUserFromOnline(data.id);
        })
    }

    checkIfUserOnline(userID) {
        for (let i = 0; i < this.onlineUsers.length; i++) {
            if (this.onlineUsers[i].id === userID) {
                return false;
            }
        }
        return true
    }

    removeUserFromOnline(userID) {
        if (!userID || userID !== this.currentUser.id) {
            return;
        }
        for (let i = 0; i < this.onlineUsers.length; i++) {
            if (this.onlineUsers[i].id === userID) {
                this.onlineUsers.splice(i, 1);
            }
        }
    }
}

module.exports = new SocketServer;