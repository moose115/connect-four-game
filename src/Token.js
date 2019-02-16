import * as PIXI from 'pixi.js';

export default class Token {

  constructor(color) {
    this.color = color;
  }

  create() {

    if(this.color === 'none') return;
    if(this.color === 'red')  return new PIXI.Sprite(PIXI.loader.resources["../src/vendor/token_red.png"].texture);
    else return new PIXI.Sprite(PIXI.loader.resources["../src/vendor/token_yellow.png"].texture);

  }
}
