const io = require('socket.io');

class SocketServer {
    constructor() {
        this.server = null;
        this.onlineUsers = [];
        this.currentUser = {};
    }

    initialize(server) {
        this.server = io.listen(server);
        this.server.on('connection', (socket) => {
            // console.log(socket.handshake.address)
            console.log('A new user has entered the chat')
            this.bindEvents(socket);
            socket.on('disconnect', () => {
                console.log('disconnected my man')
                    //crash happens with this shit
                    // removeUserFromOnline(this.currentUser.id);
            });
        })
    }

    bindEvents(socket) {
        socket.on('sendMessage', (data) => {
            socket.broadcast.emit('messageFromServer', data);
        })
        socket.on('userDetails', (data) => {
            // console.log(data)
            this.currentUser = data;
            console.log(this.currentUser);
            const check = this.checkIfUserOnline(data.id);
            if (check) {
                this.onlineUsers.push({ id: data.id, name: data.name })
            }
            socket.emit('usersOnline', this.onlineUsers)
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
        for (let i = 0; i < this.onlineUsers.length; i++) {
            if (this.onlineUsers[i].id === userID) {
                this.onlineUsers.splice(i, 1);
                console.log(this.onlineUsers);
            }
        }
    }
}

module.exports = new SocketServer;