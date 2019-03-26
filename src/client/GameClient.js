import * as PIXI from 'pixi.js';
import Board from '../Board';
import Token from '../Token';


export default class GameLocal {

  constructor(app, menu) {
    this.app = app;
    this.currentColor = 'red';
    this.boardOffsetY = 64;
    this.spriteHover = [];

    console.log(menu);
    this.menu = menu;

    this.gameScene = new PIXI.Container();
    this.app.stage.addChild(this.gameScene);
  }

  setup() {
    const board = new Board();


    for (let i = 0; i < 7; i++) {

      let rectangle = new PIXI.Graphics();
      rectangle.beginFill(0x505050);
      rectangle.drawRect(i*64, 0+this.boardOffsetY, 64, 6*64);
      rectangle.endFill();
      this.gameScene.addChild(rectangle);
      rectangle.interactive = true;
      rectangle.buttonMode = true;
      rectangle.on('click', () => {
        this.putToken(board, i, 0, this.currentColor);
        this.currentColor = (this.currentColor === 'red' ? 'yellow' : 'red');

        this.gameScene.removeChild(this.spriteHover[i]);

        this.tokenHover = new Token(this.currentColor);
        this.spriteHover[i] = this.tokenHover.create();
        this.spriteHover[i].position.set(i * 64, 0);
        this.spriteHover[i].width = 64;
        this.spriteHover[i].height = 64;
        this.gameScene.addChild(this.spriteHover[i]);

      });
      rectangle.on('mouseover', () => {
        this.tokenHover = new Token(this.currentColor);
        this.spriteHover[i] = this.tokenHover.create();
        this.spriteHover[i].position.set(i * 64, 0);
        this.spriteHover[i].width = 64;
        this.spriteHover[i].height = 64;
        this.gameScene.addChild(this.spriteHover[i]);
        rectangle.on('mouseout', () => {
          this.gameScene.removeChild(this.spriteHover[i]);
        });
      });
    }
    this.drawBoard(board);
  }

  drawBoard(board) {

    this.drawTokens(board.boardArr);
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {


        const sprite = new PIXI.Sprite(PIXI.loader.resources["./vendor/board.png"].texture);
        this.gameScene.addChild(sprite);
        const x = 64*(col);
        const y = 64*(row)+this.boardOffsetY;
        sprite.position.set(x, y);
        sprite.width = 64;
        sprite.height = 64;
      }
    }
    this.checkWin(board);
  }

  drawTokens(boardArr, column, row = 0, board) {

    boardArr.forEach( (col, i) => {

      col.forEach( (row, j, arr) => {

        const token = new Token(row.color);
        const sprite = token.create();

        if(!sprite) return;
        console.log(row.color);
        sprite.width = 64;
        sprite.height = 64;
        sprite.position.set(64*i, 64*j+this.boardOffsetY);

        this.gameScene.addChild(sprite);

      });
    });

  }

  sendToken() {
    
  }

  endGame(arg) {


  }
}
