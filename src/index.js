import * as PIXI from 'pixi.js';
import Game from './Game';



  //Create a Pixi Application
let app = new PIXI.Application({width: 256, height: 256});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

app.renderer.backgroundColor = 0xAAAAAA;

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

PIXI.loader
  .add([
    "../src/vendor/board.png",
    "../src/vendor/token_red.png",
    "../src/vendor/token_yellow.png"
  ])
  .load( () => {
    const g = new Game(app);
    g.setup();
  });
