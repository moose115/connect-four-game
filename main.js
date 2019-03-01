// const electron = requtoken_redire('electron');

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
      useContentSize: true
    };

    let win = new BrowserWindow(options);

    win.loadURL(`file://${__dirname}/dist/index.html`);
    // win.loadFile('index.html');
}

//app.disableHardwareAcceleration();
app.on('ready', createWindow);
