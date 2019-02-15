import * as PIXI from 'pixi.js';

export default class Board {


  constructor() {

    this.boardArr = this.initBoard();


  }

  initBoard() {
    let arr = [];
    for(let col = 0; col < 7; col++) {
      for(let row = 0; row < 6; row++) {
        arr.push({status: 'empty', color: 'none'});
      }
    }
    return arr;
  }

}
