import * as PIXI from 'pixi.js';
import Board from './Board';
import Token from './Token';


export default class Game {

  constructor(app) {
    this.app = app;
    this.currentColor = 'red';
  }

  setup() {
    const board = new Board();


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
        this.putToken(board, i, 0, this.currentColor);

      });
    }
    this.drawBoard(board);
  }

  drawBoard(board) {

    this.drawTokens(board.boardArr);
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {


        const sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/board.png"].texture);
        this.app.stage.addChild(sprite);
        const x = 64*(col);
        const y = 64*(row);
        sprite.position.set(x, y);
        sprite.width = 64;
        sprite.height = 64;
      }
    }
    console.table(board.boardArr);
  }

  drawTokens(boardArr, column, row = 0, board) {

    boardArr.forEach( (el, i, arr) => {

      const token = new Token(el.color);
      const sprite = token.create();

      if(!sprite) return;
      // if(el.color === 'none') return;
      // if(el.color === 'red')  sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/token_red.png"].texture);
      // else sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/token_yellow.png"].texture);
      sprite.width = 64;
      sprite.height = 64;
      sprite.position.set(64*(i%7), 64*(row%6));
console.log(row);

      this.app.stage.addChild(sprite);
    });

  }

  putToken(board, column, row, color = 'red') {

    const token = new Token(color);
    const sprite = token.create();

    if(!sprite) return;

    sprite.width = 64;
    sprite.height = 64;
    sprite.position.set(64*column, 0);

    const dropTick = new PIXI.ticker.Ticker();
    dropTick.autoStart = true;
    dropTick.add( (delta) => {

      console.log(delta);
      const i = Math.floor(sprite.y / 64) + 1;
      if(board.boardArr[i].status === 'occupied' || sprite.y >= 5*64) {
        const x = column;

        board.boardArr[i].color = color;
        board.boardArr[i].status = 'occupied';
        this.drawBoard(board);
        console.log(sprite.y +' '+ column);
        sprite.destroy();
        dropTick.stop();
      }
      else {
        sprite.y += 2;

      }
    });


    this.app.stage.addChild(sprite);

    this.drawBoard(board);
  }
}
