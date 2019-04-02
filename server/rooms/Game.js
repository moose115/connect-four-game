const colyseus = require('colyseus');

const Board = require('../../src/Board');


module.exports = class Game extends colyseus.Room {

  onInit() {
    this.board = new Board;
    this.currentColor = 'red';
    this.maxClients = 2;

    
  }

  onJoin(client) {

    if(this.clients.length === 2) {
      this.send(this.clients[0], {task: 'setColor', color: 'red', currentColor: this.currentColor});
      this.send(this.clients[1], {task: 'setColor', color: 'yellow', currentColor: this.currentColor});
      this.broadcast({task: 'startGame'});
    }
    
  }

  onMessage(c, m) {

    switch(m.task) {
      case 'putToken': this.putToken(m.col, m.row, m.color); 
        break;

      case 'dropToken': {
        this.broadcast({task: m.task, col: m.col, color: m.color}, {except: c});
      }
      
    }
  }

  requestJoin (options) {
    // Prevent the client from joining the same room from another browser tab
    return (this.clients.filter(c => c.id === options.clientId).length === 0);
  }

  putToken(col, row, color) {
    this.board.boardArr[col][row].status = 'occupied'
    this.board.boardArr[col][row].color = color;
    this.toggleColor();
    this.broadcast({task: 'sendGameState', board: this.board, color: this.currentColor});
    this.checkWin(this.board);
    
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
        if(counter >= 4 && color !== 'none') return this.endGame(color);
      }
    }

    //check row
    for (let row = 0; row < board.boardArr[row].length; row++) {

      counter = 0;

      for(let col = 0; col < board.boardArr.length; col++) {

        if(color !== board.boardArr[col][row].color) counter = 0;
        color = board.boardArr[col][row].color;
        counter++;
        if(counter >= 4 && color !== 'none') return this.endGame(color);
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

              if(offsetCol > 6 || offsetRow > 5) continue;
              if(color !== board.boardArr[offsetCol][offsetRow].color) counter = 0;
              color = board.boardArr[offsetCol][offsetRow].color;
              counter++;
              if(counter >= 4 && color !== 'none') return this.endGame(color);
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

          if(offsetCol < 0 || offsetRow > 5) continue;
          if(color !== board.boardArr[offsetCol][offsetRow].color) counter = 0;
          color = board.boardArr[offsetCol][offsetRow].color;
          counter++;
          if(counter >= 4 && color !== 'none') return this.endGame(color);
          offsetCol += bDir[0];
          offsetRow += bDir[1];

        }
      }
    }
  }

  toggleColor() {
    let c = this.currentColor;
    c = c === 'red' ? c = 'yellow' : c = 'red';
    this.currentColor = c;
  }

  endGame(color) {
    this.broadcast({task: 'endGame', color: color});
  }
}
