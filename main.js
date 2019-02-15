// const electron = requtoken_redire('electron');

const { app, BrowserWindow } = require('electron');

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});


function createWindow() {

    let win = new BrowserWindow({width: 800, height: 800, icon: './src/vendor/icon.png'});

    win.loadURL(`file://${__dirname}/dist/index.html`);
    // win.loadFile('index.html');
}

//app.disableHardwareAcceleration();
app.on('ready', createWindow);
