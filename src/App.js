import * as Colyseus from 'colyseus.js';

import GameLocal from './local/GameLocal';
import Menu from './Menu';

export default class App {


  constructor(app) {

    // let client = new Colyseus.Client('ws://localhost:3000');

    // let room = client.join('game');

    // room.onJoin.add( () => {

    //   console.log('Joined the room!');

    // });

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
                let client = new Colyseus.Client('ws://localhost:3000');
                client.onError.add(function(err) {
                  console.log("something wrong happened", err);
                });
                console.log(client.getAvailableRooms('game', (r, e) => {
                  if(e) console.error(e);
                  r.forEach(element => {
                    console.log(element);
                    
                  });
                  
                }));
                
                let room = client.join('game');
                room.onError.add(function(err) {
                  console.log("oops, error ocurred:");
                  console.log(err);
                });
                room.onJoin.add( () => {
                  console.log('Joined the room!');
                  
                });
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
    const g = new GameLocal(app, menu);
    g.setup();
    console.log(g);
  }

  startHost() {

    // const gm = new GameMulti();
    // gm.createHost();
  }
}
