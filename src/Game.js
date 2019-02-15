import * as PIXI from 'pixi.js';
import Board from './Board';


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

  drawTokens(boardArr, column, row, board) {

    boardArr.forEach( (el, i, arr) => {
      let sprite;
      if(el.color === 'none') return;
      if(el.color === 'red')  sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/token_red.png"].texture);
      else sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/token_yellow.png"].texture);
      sprite.width = 64;
      sprite.height = 64;
      sprite.position.set(64*(i%7), 64*(1%6));


      this.app.stage.addChild(sprite);
    });

  }

  putToken(board, column, row, color) {
    board.boardArr[column].color = color;
    board.boardArr[column].status = 'occupied';
    this.drawBoard(board);
  }

  update(delta, board) {

    this.drawBoard(board);


  }
}
