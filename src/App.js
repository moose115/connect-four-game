import * as Colyseus from 'colyseus.js';

import GameLocal from './local/GameLocal';
import GameClient from './client/GameClient';
import Menu from './Menu';

export default class App {


  constructor(app) {

    this.app = app;

    this.button = [
      {
        text: 'Start Local Game',
        function: this.startGame
      },
      {
        text: 'Join Network Game',
        function: () => {

          this.joinHost();
        }
      }
    ];
    this.menu = new Menu(this.app, this.button);
    
  }

  init() {

    this.menu.drawMenu();
  }

  startGame(app, menu) {
    const g = new GameLocal(app, menu);
    g.setup();
    console.log(g);
  }

  async startHost() {

    const gc = new GameClient(this.app, this.menu);
    gc.setup();
  }

  joinHost() {

    const gc = new GameClient(this.app, this.menu);
  }
}
