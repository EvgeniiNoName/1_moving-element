/** @jest-environment jsdom */
const { GoblinGame } = require('../../js/goblin-game/goblin-game.js');


describe('GoblinGame', () => {
  let goblinGame;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    goblinGame = new GoblinGame(container);
  });

  afterEach(() => {
    container = null;
    goblinGame = null;
  });

  test('конструктор должен инициализировать экземпляр GoblinGame', () => {
    expect(goblinGame).toBeInstanceOf(GoblinGame);
    expect(goblinGame._element).toBe(container);
    expect(goblinGame.minHole).toBe(1);
    expect(goblinGame.maxHole).toBe(16);
  });

  test('randomPosition должен возвращать число в заданном диапазоне', () => {
    const randomPos = goblinGame.randomPosition();
    expect(randomPos).toBeGreaterThanOrEqual(goblinGame.minHole);
    expect(randomPos).toBeLessThanOrEqual(goblinGame.maxHole);
  });

  test('addField должен добавить отверстия в контейнер', () => {
    goblinGame.addField();
    expect(container.querySelectorAll('.hole').length).toBe(goblinGame.maxHole);
  });

  test('startHole должен добавить класс hole_has-mole к случайному отверстию', () => {
    goblinGame.addField();
    goblinGame.startHole();
    expect(container.querySelector('.hole_has-mole')).toBeTruthy();
});

  test('moveGoblin должен переместить гоблина в другое отверстие', () => {
    goblinGame.addField();
    const initialPos = goblinGame.randomPosition();
    const initialHole = container.querySelector(`#id${initialPos}`);
    initialHole.classList.add('hole_has-mole');
    goblinGame.moveGoblin();
    const newHole = container.querySelector('.hole_has-mole');
    expect(newHole).toBeTruthy();
    expect(newHole).not.toBe(initialHole);
  });

});
