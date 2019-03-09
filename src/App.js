import * as PIXI from 'pixi.js';

import Game from './local/Game';
import Menu from './Menu';

//import GameMulti from './server/GameMulti';

export default class App {

  constructor(app) {
    this.app = app;

    this.button = [
      {
        text: 'Start Local Game',
        function: this.startGame
      },
      {
        text: 'Start Network Game',
        function: () => {

          this.buttonsMulti = [
            {
              text: 'Host Game',
              function: () => {
                this.startHost();
              }
            },
            {
              text: 'Join Game',
              function: () => {
                console.log('to do');
              }
            }
          ];

          const multiMenu = new Menu(this.app, this.buttonsMulti);
          multiMenu.drawMenu();
        }
      }
    ];
    this.menu = new Menu(this.app, this.button);
  }

  init() {

    this.menu.drawMenu();
  }

  startGame(app, menu) {
    const g = new Game(app, menu);
    g.setup();
    console.log(g);
  }

  startHost() {

    // const gm = new GameMulti();
    // gm.createHost();
  }
}
