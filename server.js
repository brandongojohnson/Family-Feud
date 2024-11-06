const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');  // Destructure to get the Server constructor
const io = new Server(server);  // Create a new instance of socket.io
const port = Number(process.env.PORT) || 8080;

server.listen(port);
console.log('Listening on ' + port);

app.use('/public', express.static('public'))
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

io.sockets.on('connection', (socket) => {
    socket.on('talking',  (data) => io.sockets.emit('listening', data))
});