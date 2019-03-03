import * as PIXI from 'pixi.js';
import Game from './Game';
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
        text: 'Start Network Game',
        function: function() {
          console.log('To be done');
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
}
