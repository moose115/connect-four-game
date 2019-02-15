import * as PIXI from 'pixi.js';
import Board from './Board';


export default class Game {

  constructor(app) {
    this.app = app
  }

  setup() {

    //drawBoard();
    const board = new Board();
    this.app.ticker.add(delta => this.update(delta, board));

    for (let i = 0; i < 7; i++) {

      let rectangle = new PIXI.Graphics();
      rectangle.beginFill(0x505050);
      rectangle.drawRect(i*64, 0, 64, 6*64);
      rectangle.endFill();
      this.app.stage.addChild(rectangle);
      rectangle.interactive = true;
      rectangle.buttonMode = true;
      rectangle.on('click', () => {
        console.log(i);

      });
    }
  }

  drawBoard(board) {


    for (let i = 0; i < 42; i++) {

      this.drawToken(board.board[i].color, i%7, i%6);

      const sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/board.png"].texture);
      this.app.stage.addChild(sprite);
      const x = 64*(i%7);
      const y = 64*(i%6);
      sprite.position.set(x, y);
      sprite.width = 64;
      sprite.height = 64;
    }
  }

  drawToken(color, column, row, board) {

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
    this.app.stage.addChild(sprite);
  }

  update(delta, board) {

    this.drawBoard(board);


  }
}
