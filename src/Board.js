module.exports = class Board {


  constructor() {

    this.boardArr = this.initBoard();


  }

  initBoard() {
    let arr = [];
    for(let col = 0; col < 7; col++) {

      arr[col] = [];

      for(let row = 0; row < 6; row++) {
        arr[col][row] = {status: 'empty', color: 'none'};
      }
    }
    return arr;
  }

}
