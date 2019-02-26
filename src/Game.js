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
        this.currentColor = (this.currentColor === 'red' ? 'yellow' : 'red');

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
    //console.table(board.boardArr);
  }

  drawTokens(boardArr, column, row = 0, board) {

    boardArr.forEach( (col, i) => {

      col.forEach( (row, j, arr) => {

        const token = new Token(row.color);
        const sprite = token.create();

        if(!sprite) return;
        console.log(row.color);
        // if(el.color === 'none') return;
        // if(el.color === 'red')  sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/token_red.png"].texture);
        // else sprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/token_yellow.png"].texture);
        sprite.width = 64;
        sprite.height = 64;
        sprite.position.set(64*i, 64*j);

        this.app.stage.addChild(sprite);

      });
    });

  }

  // pushDown(col, b) {
  //   let row = 0;
  //   while(row <= b.length) {
  //     if (b[col + 7][row].status === 'occupied' && b[col + 7].status) {
  //       return col;
  //     }
  //     row += 7;
  //   }
  // }

  putToken(board, col, row = 0, color = 'red') {

    if(board.boardArr[col][0].status === 'occupied') return alert('col is ful');

    const token = new Token(color);
    const sprite = token.create();

    if(!sprite) return;

    sprite.width = 64;
    sprite.height = 64;
    sprite.position.set(64*col, 0);

    const dropTick = new PIXI.ticker.Ticker();
    dropTick.autoStart = true;
    dropTick.add( () => {

      const i = Math.floor(sprite.y / 64);
      if (i > 5) return dropTick.stop();
      if(!board.boardArr[col][i+1]) {
        board.boardArr[col][5].color = color;
        board.boardArr[col][5].status = 'occupied';
        return;

      }
      if(board.boardArr[col][i+1].status === 'occupied') {
        board.boardArr[col][i].color = color;
        board.boardArr[col][i].status = 'occupied';
        this.drawBoard(board);
        sprite.destroy();
        this.checkWin(board);
        dropTick.stop();
      }
      else {
        sprite.y += 20;

      }
    });


    this.app.stage.addChild(sprite);

    this.drawBoard(board);
  }

  checkWin(board) {

    //check column
    for (let col = 0; col < board.boardArr.length; col++) {
      let color, counter = 0;

      for(let row = 0; row < board.boardArr[col].length; row++) {

        if(color !== board.boardArr[col][row].color) counter = 0;
        color = board.boardArr[col][row].color;
        counter++;
        if(counter >= 4 && color !== 'none') return alert(color + ' wins!');
      }
    }
  }
}
