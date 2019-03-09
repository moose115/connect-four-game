// const electron = requtoken_redire('electron');


const colyseus = require('colyseus');
const http = require('http');
const express = require('express');
const port = process.env.port || 3000;
const { app, BrowserWindow } = require('electron');

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});


function createWindow() {

    const options = {
      width: 7*64,
      height: 7*64,
      icon: './src/vendor/icon.png',
      resizable: false,
      useContentSize: true,
      autoHideMenuBar: true
    };

    let win = new BrowserWindow(options);

    win.loadURL(`file://${__dirname}/dist/index.html`);
    // win.loadFile('index.html');
    const expApp = express();
    const gameServer = new colyseus.Server({
      server: http.createServer(expApp)
    });

    gameServer.listen(port);
}

//app.disableHardwareAcceleration();
app.on('ready', createWindow);
