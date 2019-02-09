import States from './States';

export default class Board {

  constructor() {
    console.log(initBoard());
    console.log(States.red);
  }

}

function initBoard() {
  let arr = [];
  for(let col = 0; col < 7; col++) {
    for(let row = 0; row < 6; row++) {
      arr.push(States.empty);
    }
  }
  console.log(arr);
  return arr;
}
