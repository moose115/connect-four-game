import * as PIXI from 'pixi.js';
import App from './App';



  //Create a Pixi Application
let pixiApp = new PIXI.Application({width: 256, height: 256});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(pixiApp.view);

pixiApp.renderer.backgroundColor = 0xAAAAAA;
pixiApp.renderer.autoResize = true;
pixiApp.renderer.resize(7*64, 7*64);

PIXI.loader
  .add([
    "../src/vendor/board.png",
    "../src/vendor/token_red.png",
    "../src/vendor/token_yellow.png"
  ])
  .load( () => {
    const app = new App(pixiApp);
    app.init();
  });
