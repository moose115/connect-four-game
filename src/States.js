const red = 'RED';
const occupied = true;
const empty = false;

export default class States {

  constructor() {
    this.occupied = true;
    this.empty = false;

    this.red = 'RED';
  }

  static get occupied() {return occupied}
  static get empty() {return empty}
  static get red() {return red}

  static isRed(check) {
    return check === red ? true : false;
  }
}
