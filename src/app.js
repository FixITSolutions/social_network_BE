const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersController = require('./controllers/users.controller');
const adminController = require('./controllers/admin.controller');
const wallController = require('./controllers/wall.controller');
const profileController = require('./controllers/profile.controller');
const { sequelize } = require('./models/databaseConnector');
const app = express();
const port = 3000;
const nStatic = require('node-static');
const config = require('config');
const http = require('http');
const SocketServer = require('./socket/socket.server');

// DB connect
sequelize.sync({
    force: false,
}).then(() => {
    console.log('Succesfully connected to DB');
});

//middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))
const fileServer = new nStatic.Server('./public/uploads');
http.createServer((req, res) => {
    request.addListener('end', function() {
        //
        // Serve files!
        //
        fileServer.serve(request, response);
    }).resume();
});

app.get('/', (req, res) => res.send(config.endpoints));

app.use('/users', usersController);
app.use('/admin', adminController);
app.use('/profile', profileController);
app.use('/posts', wallController);

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//socket
SocketServer.initialize(server)