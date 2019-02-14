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
  .add([
    "../src/vendor/board.png",
    "../src/vendor/token_red.png",
    "../src/vendor/token_yellow.png"
  ])
  .load(setup);

function setup() {

    //drawBoard();
    const board = new Board();
    app.ticker.add(delta => update(delta, board));

    for (let i = 0; i < 7; i++) {
      
      let rectangle = new PIXI.Graphics();
      rectangle.beginFill(0x505050);
      rectangle.drawRect(i*64, 0, 64, 6*64);
      rectangle.endFill();
      app.stage.addChild(rectangle);
      rectangle.interactive = true;
      rectangle.buttonMode = true;
      rectangle.on('click', () => {
        console.log(i);
        
      });
    }
  }
  
function drawBoard(board) {

    
  for (let i = 0; i < 42; i++) {

    drawToken(board.board[i].color, i%7, i%6);

    const sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/board.png"].texture);
    app.stage.addChild(sprite);
    const x = 64*(i%7);
    const y = 64*(i%6);
    sprite.position.set(x, y);
    sprite.width = 64;
    sprite.height = 64;
  }
}
  
function drawToken(color, column, row, board) {
  
  let sprite;
  if(color === 'none') return;
  if(color === 'red')  sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/token_red.png"].texture);
  else sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/token_yellow.png"].texture);
  sprite.width = 64;
  sprite.height = 64;
  sprite.position.set(64*column, 64*row);

  for (let i = 0; i < 7; i++) {
    const element = [i];
    
  }
  app.stage.addChild(sprite);
}

function update(delta, board) {
  
  drawBoard(board);


}

