import States from './States';
import * as PIXI from 'pixi.js';

export default class Board {
  
  
  constructor() {

    this.board = initBoard();

    PIXI.loader
      .add('../src/vendor/board.png')
      .load( () => {
        const size = 64;

        for(let i = 0; i < this.board.length; i++) {
          const x = size*i%7;
          const y = size*i%6;

          const boardSprite = new PIXI.Sprite(PIXI.loader.resources["../src/vendor/board.png"].texture);

          boardSprite.position.set(x, y);

        }
      });
  }

}

function initBoard() {
  let arr = [];
  for(let col = 0; col < 7; col++) {
    for(let row = 0; row < 6; row++) {
      arr.push(States.empty);
    }
  }
  return arr;
}
