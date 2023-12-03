const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let users = [];

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('login', (data) => {
        const found = users.find((nickname) => {
            return nickname === data;
        });
        if (!found) {
            users.push(data);
            io.sockets.emit('login', { status: 'OK' });
        } else {
            io.sockets.emit('login', { status: 'FAILED' });
        }
    })
});

server.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Server started on http://localhost:${PORT}`);
});


