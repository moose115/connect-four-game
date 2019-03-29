// import * as PIXI from 'pixi.js';
// import App from './App';

import * as Colyseus from 'colyseus.js';



//   //Create a Pixi Application
// let pixiApp = new PIXI.Application({width: 256, height: 256});

// //Add the canvas that Pixi automatically created for you to the HTML document
// document.body.appendChild(pixiApp.view);

// pixiApp.renderer.backgroundColor = 0xAAAAAA;
// pixiApp.renderer.autoResize = true;
// pixiApp.renderer.resize(7*64, 7*64);

// PIXI.loader
//   .add([
//     "./vendor/board.png",
//     "./vendor/token_red.png",
//     "./vendor/token_yellow.png"
//   ])
//   .load( () => {
//     // const app = new App(pixiApp);
//     // app.init();

    
//   });
  
let client = new Colyseus.Client('ws://localhost:3000');

let room = client.join('game');
room.onJoin.add( () => {

  console.log('Joined the room!');

});