import States from './States';
import * as PIXI from 'pixi.js';

export default class Board {


  constructor() {

    this.board = initBoard();

    
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
