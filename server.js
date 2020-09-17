const express = require("express");
const http = require('http');
const https = require('https');
const fs = require('fs');

const expressApp = express();
// HTTP server
const server = http.createServer(expressApp);

//HTTPS server
const secureServer = https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
}, expressApp);

let clients = 0

const io = require('socket.io')(server);
const ios = require('socket.io')(secureServer);

//Setup public file
expressApp.use(express.static('public'))


const HTTP_PORT = 8181;
const HTTPS_PORT = 4444;

io.on("connection", (socket) => {
    new Socket(socket);
    
    socket.on("NewClient", function () {
        if (clients < 2) {
            if (clients == 1) {
                this.emit('CreatePeer')
            }
        }
        else
            this.emit('SessionActive')
        clients++;
    })
    socket.on('Offer', SendOffer)
    socket.on('Answer', SendAnswer)
    socket.on('disconnect', Disconnect)

});
    

ios.on("connection", (socket) => {
    new Socket(socket)
    socket.on("NewClient", function () {
        if (clients < 2) {
            if (clients == 1) {
                this.emit('CreatePeer')
            }
        }
        else
            this.emit('SessionActive')
        clients++;
    })
    socket.on('Offer', SendOffer)
    socket.on('Answer', SendAnswer)
    socket.on('disconnect', Disconnect)

});

class Socket {
    constructor(socket) {
        console.log("connection from client");
        this.socket = socket;
        this.socket.on('message', this.onMessage.bind(this));
    }
}
Socket.prototype.onMessage = function (msg) {
    console.log("client: " + msg)
    const fromServer = "Server: " + msg
    console.log(fromServer);
    this.socket.emit("message", fromServer);
}

function Disconnect() {
    if (clients > 0) {
        if (clients <= 2)
            this.broadcast.emit("Disconnect")
        clients--
    }
}

function SendOffer(offer) {
    this.broadcast.emit("BackOffer", offer)
}

function SendAnswer(data) {
    this.broadcast.emit("BackAnswer", data)
}


server.listen(HTTP_PORT, () => {
    console.log('server started at ', HTTP_PORT);
});

secureServer.listen(HTTPS_PORT, () => {
    console.log("secure server started at ", HTTPS_PORT);
})


