export { GoblinGame };

class GoblinGame {
  constructor(element) {
    this._element = element;
    this.minHole = 1;
    this.maxHole = 16;
  }

  randomPosition() {
    return Math.floor(Math.random() * (this.maxHole - this.minHole + 1)) + this.minHole;
  }

  addField() {
    for (let i = this.minHole; i <= this.maxHole; i++) {
      const item = document.createElement('div');
      item.classList.add('hole');
      item.id = 'id' + i;
      this._element.appendChild(item);
    }
  }

  startHole() {
    const randomPos = this.randomPosition();
    let getHole = document.getElementById(`id${randomPos}`);
    getHole.classList.add('hole_has-mole');
    const intervalId = setInterval(() => {
      this.moveGoblin();
    }, 10000);

  }

  moveGoblin() {
    for (let i = this.minHole; i <= this.maxHole; i++) {
      const getHole = document.getElementById(`id${i}`)
      if (getHole.classList.contains( 'hole_has-mole' )) {
        getHole.classList.remove('hole_has-mole');
        let newPos = this.randomPosition();
        while (newPos == i) {
          newPos = this.randomPosition();
        }
        let newHole = document.getElementById(`id${newPos}`)
        newHole.classList.add('hole_has-mole')
      }
    }
  }
}
