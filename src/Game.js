import * as PIXI from 'pixi.js';
import Board from './Board';
import Token from './Token';


export default class Game {

  constructor(app) {
    this.app = app;
    this.currentColor = 'red';
    this.boardOffsetY = 64;
    this.spriteHover = [];
  }

  setup() {
    const board = new Board();


    for (let i = 0; i < 7; i++) {

      let rectangle = new PIXI.Graphics();
      rectangle.beginFill(0x505050);
      rectangle.drawRect(i*64, 0+this.boardOffsetY, 64, 6*64);
      rectangle.endFill();
      this.app.stage.addChild(rectangle);
      rectangle.interactive = true;
      rectangle.buttonMode = true;
      rectangle.on('click', () => {
        console.log(i);
        this.putToken(board, i, 0, this.currentColor);
        this.currentColor = (this.currentColor === 'red' ? 'yellow' : 'red');

        this.app.stage.removeChild(this.spriteHover[i]);

        this.tokenHover = new Token(this.currentColor);
        this.spriteHover[i] = this.tokenHover.create();
        this.spriteHover[i].position.set(i * 64, 0);
        this.spriteHover[i].width = 64;
        this.spriteHover[i].height = 64;
        this.app.stage.addChild(this.spriteHover[i]);

      });
      rectangle.on('mouseover', () => {
        this.tokenHover = new Token(this.currentColor);
        this.spriteHover[i] = this.tokenHover.create();
        this.spriteHover[i].position.set(i * 64, 0);
        this.spriteHover[i].width = 64;
        this.spriteHover[i].height = 64;
        this.app.stage.addChild(this.spriteHover[i]);
        rectangle.on('mouseout', () => {
          this.app.stage.removeChild(this.spriteHover[i]);
        });
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

        this.app.stage.addChild(sprite);

      });
    });

  }

  putToken(board, col, row = 0, color = 'red') {

    if(board.boardArr[col][0].status === 'occupied') return alert('col is ful');

    const token = new Token(color);
    const sprite = token.create();

    if(!sprite) return;

    sprite.width = 64;
    sprite.height = 64;
    sprite.position.set(64*col, 0+this.boardOffsetY);

    const dropTick = new PIXI.ticker.Ticker();
    dropTick.autoStart = true;
    dropTick.add( () => {

      const i = Math.floor(sprite.y / 64) - 1;
      if (i > 5) return dropTick.stop();
      if(!board.boardArr[col][i+1]) {
        board.boardArr[col][5].color = color;
        board.boardArr[col][5].status = 'occupied';
        this.drawBoard(board);
        sprite.destroy();
        dropTick.stop();
        return;

      }
      if(board.boardArr[col][i+1].status === 'occupied') {
        board.boardArr[col][i].color = color;
        board.boardArr[col][i].status = 'occupied';
        this.drawBoard(board);
        sprite.destroy();
        dropTick.stop();
      }
      else {
        sprite.y += 20;
      }
    });


    this.app.stage.addChild(sprite);
  }

  checkWin(board) {

    let color, counter = 0;
    //check column
    for (let col = 0; col < board.boardArr.length; col++) {

      counter = 0;

      for(let row = 0; row < board.boardArr[col].length; row++) {

        if(color !== board.boardArr[col][row].color) counter = 0;
        color = board.boardArr[col][row].color;
        counter++;
        if(counter >= 4 && color !== 'none') return alert(color + ' wins!');
      }
    }

    //check row
    for (let row = 0; row < board.boardArr[row].length; row++) {

      counter = 0;

      for(let col = 0; col < board.boardArr.length; col++) {

        if(color !== board.boardArr[col][row].color) counter = 0;
        color = board.boardArr[col][row].color;
        counter++;
        if(counter >= 4 && color !== 'none') return alert(color + ' wins!');
      }
    }

    //check diagonal
    const fDir = [1, 1], bDir = [-1, 1]; //diagonal directions

      // '\' diag dir


    for (let col = 0; col < 4; col++) {


          for(let row = 0; row < 3; row++) {

            let offsetCol = col;
            let offsetRow = row;

            counter = 0;

            for(let i = 0; i < 4; i++) {

              console.log(offsetCol);
              if(offsetCol > 6 || offsetRow > 5) continue;
              if(color !== board.boardArr[offsetCol][offsetRow].color) counter = 0;
              color = board.boardArr[offsetCol][offsetRow].color;
              counter++;
              if(counter >= 4 && color !== 'none') return alert(color + ' wins! \\');
              offsetRow += fDir[1];
              offsetCol += fDir[0];

            }
          }
        }

    // '/' diag dir

    for (let col = 6; col > 0; col--) {


      for(let row = 0; row < 3; row++) {

        let offsetCol = col;
        let offsetRow = row;

        counter = 0;

        for(let i = 0; i < 4; i++) {

          console.log(offsetCol);
          if(offsetCol < 0 || offsetRow > 5) continue;
          if(color !== board.boardArr[offsetCol][offsetRow].color) counter = 0;
          color = board.boardArr[offsetCol][offsetRow].color;
          counter++;
          if(counter >= 4 && color !== 'none') return alert(color + ' wins! /');
          offsetCol += bDir[0];
          offsetRow += bDir[1];

        }
      }
    }




  }

}
