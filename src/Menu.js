import * as PIXI from 'pixi.js';

export default class Menu {

  constructor(app, menuButtons) {

    this.app = app;
    this.button = menuButtons;
    this.menuScene = new PIXI.Container();
    this.app.stage.addChild(this.menuScene);
  }

  drawMenu() {
    for(let i = 0; i < this.button.length; i++) {

      const rectangle = new PIXI.Graphics();
      rectangle.lineStyle(2, 0x777777);
      rectangle.beginFill(0x888888);
      rectangle.drawRect(64, 2*i*64 + 64, 5*64, 64);
      rectangle.endFill();
      rectangle.interactive = true;
      rectangle.buttonMode = true;
      rectangle.on('pointertap', () => {
        this.button[i].function(this.app, this);
        this.toggleMenu();
      });
      rectangle.on('pointerover', () => {
        rectangle.lineStyle(2, 0x555555);
        rectangle.beginFill(0x666666);
        rectangle.drawRect(64, 2*i*64 + 64, 5*64, 64);
        rectangle.endFill();
      });
      rectangle.on('pointerout', () => {
        rectangle.lineStyle(2, 0x777777);
        rectangle.beginFill(0x888888);
        rectangle.drawRect(64, 2*i*64 + 64, 5*64, 64);
        rectangle.endFill();
      });
      this.menuScene.addChild(rectangle);

      const text = new PIXI.Text();
      text.text = this.button[i].text;
      text.style = {fill: 'white', fontSize: 32};
      text.anchor.set(.5);
      text.x = rectangle.x + (rectangle.width / 2) + 64;
      text.y = 2*i*64 + 64 + (rectangle.height / 2);
      this.menuScene.addChild(text);
    }
  }

  toggleMenu() {
    this.menuScene.visible = (this.menuScene.visible ? false : true);
  }
}
