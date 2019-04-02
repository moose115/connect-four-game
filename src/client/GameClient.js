import * as PIXI from 'pixi.js';
import * as Colyseus from 'colyseus.js';
import Board from '../Board';
import Token from '../Token';
import WaitScreen from './WaitScreen';

const endpoint = (window.location.hostname.indexOf("herokuapp") === -1)
  ? "ws://localhost:3000" // development (local)
: `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}` // production (heroku remote)

export default class GameClient {

  constructor(app, menu) {

    this.client = new Colyseus.Client(endpoint);
    

    this.room = this.client.join('game');

    this.room.onMessage.add( (m) => {      

      switch(m.task) {

        case 'startGame': this.setup();
        break;

        case 'sendGameState': {
          this.board = m.board;
          this.currentColor = m.color;
          this.drawBoard(this.board);
        }
        break;

        case 'endGame': this.endGame(m.color);
        break;

        case 'setColor': {
          this.yourColor = m.color;
          this.currentColor = m.currentColor;
        }
        break;

        case 'dropToken': {
          this.dropToken(this.board, m.col, m.color);
          
        }
        break;
        case 'leave' : {
          alert('Your opponent left the game.');
          endGame(this.yourColor);
        }
        break;
        default: throw new Error('Illegal task.');
      }
    });


    this.app = app;
    this.yourColor = null;
    this.currentColor = 'red';
    this.isFalling = false;
    this.board = new Board();
    this.boardOffsetY = 64;
    this.spriteHover = [];

    this.menu = menu;

    this.gameScene = new PIXI.Container();
    this.waitingScreen = new WaitScreen();
    this.app.stage.addChild(this.waitingScreen);
  }
  
  setup() {
    
    this.app.stage.removeChild(this.waitingScreen);
    this.app.stage.addChild(this.gameScene);

    for (let i = 0; i < 7; i++) {

      let rectangle = new PIXI.Graphics();
      rectangle.beginFill(0x505050);
      rectangle.drawRect(i*64, 0+this.boardOffsetY, 64, 6*64);
      rectangle.endFill();
      this.gameScene.addChild(rectangle);
      rectangle.interactive = true;
      rectangle.buttonMode = true;
      rectangle.on('pointerdown', () => {
        
        if(this.yourColor === this.currentColor && !this.isFalling) {
          this.isFalling = true;
          this.putToken(this.board, i, 0, this.yourColor);

          this.gameScene.removeChild(this.spriteHover[i]);

          if( !(navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
          )) this.tokenHover = new Token(this.currentColor);

          this.spriteHover[i] = this.tokenHover.create();
          this.spriteHover[i].position.set(i * 64, 0);
          this.spriteHover[i].width = 64;
          this.spriteHover[i].height = 64;
          this.gameScene.addChild(this.spriteHover[i]);
        }

      });
      rectangle.on('mouseover', () => {
        if(this.yourColor === null) return;
        this.tokenHover = new Token(this.yourColor);
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
    this.drawBoard(this.board);
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
  }
  
  drawTokens(boardArr, column, row = 0, board) {
    
    boardArr.forEach( (col, i) => {
      
      col.forEach( (row, j, arr) => {
        
        const token = new Token(row.color);
        const sprite = token.create();
        
        if(!sprite) return;
        sprite.width = 64;
        sprite.height = 64;
        sprite.position.set(64*i, 64*j+this.boardOffsetY);
        
        this.gameScene.addChild(sprite);
        
      });
    });
    
  }
  
  putToken(board, col, row = 0, color = 'red') {
    this.room.send({task: 'dropToken', col: col, color: color});
    
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
        // board.boardArr[col][5].color = color;
        // board.boardArr[col][5].status = 'occupied';
        this.isFalling = false;
        this.room.send({
          task: 'putToken',
          col: col,
          row: 5,
          color: color,
          status: 'occupied'
        });
        this.drawBoard(board);
        sprite.destroy();
        dropTick.stop();
        return;

      }
      if(board.boardArr[col][i+1].status === 'occupied') {
        // board.boardArr[col][i].color = color;
        // board.boardArr[col][i].status = 'occupied';
        this.isFalling = false;
        this.room.send({
          task: 'putToken',
          col: col,
          row: i,
          color: color,
          status: 'occupied'
        });
        this.drawBoard(board);
        sprite.destroy();
        dropTick.stop();
      }
      else {
        sprite.y += 20;
      }
    });


    this.gameScene.addChild(sprite);
  }

  dropToken(board, col, color) {
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
        this.drawBoard(board);
        sprite.destroy();
        dropTick.stop();
        return;

      }
      if(board.boardArr[col][i+1].status === 'occupied') {
        this.drawBoard(board);
        sprite.destroy();
        dropTick.stop();
      }
      else {
        sprite.y += 20;
      }
    });
    this.gameScene.addChild(sprite);
  }


  endGame(color) {
    alert(color + ' wins!');
    this.app.stage.removeChild(this.gameScene);
    this.menu.toggleMenu();
    this.room.leave();
    this.client.close();
  }
}
