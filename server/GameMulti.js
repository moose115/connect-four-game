const colyseus = require('colyseus');
const http = require('http');
const express = require('express');
const port = process.env.port || 3000;


const expApp = express();
const gameServer = new colyseus.Server({
  server: http.createServer(expApp)
});

gameServer.listen(port);

console.log('Started!');
