import * as PIXI from 'pixi.js';

export default class WaitScreen extends PIXI.Container {

    constructor() {
        super();

        const text = new PIXI.Text('Wainting for an opponent...');
        text.style = {fill: 'white', fontSize: 32};
        text.anchor.set(.5);
        text.x = 3.5 * 64;
        text.y = 3.5 * 64;

        this.addChild(text);

    }
}