/**
 * index.js is entry point for program(server)
 * and contains code for peer-server
 */

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const server = http.createServer(app);
const { ExpressPeerServer } = require('peer');
const port = process.env.PORT || '8080';

const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/myapp',
})

app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/static/index.html');
});

server.listen(port);
console.log('Listening on: ' + port);