import * as PIXI from 'pixi.js';
import Board from './Board';


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
  .add("../src/vendor/board.png")
  .load(setup);

function setup() {

    let b = new Board();
    console.log(b.board);

}

function drawBoard() {

  for (let i = 0; i < 42; i++) {
    const sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/board.png"].texture);
    app.stage.addChild(sprite);
    const x = 64*(i%7);
    const y = 64*(i%6);
    sprite.position.set(x, y);
    sprite.width = 64;
    sprite.height = 64;
  }
}
