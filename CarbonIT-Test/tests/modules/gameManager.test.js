const {GameMap} = require("../../build/classes/GameMap.class");
const {GameManager} = require("../../build/modules/GameManager");

describe("GameManager", () => {

  const gameMap = new GameMap();
  const gameManager = new GameManager('input.txt', gameMap);

  it("should place map 3 / 4 with all data", () => {
    gameManager.data = [
      ['C', '3', '4'],
      ['M', '1', '0'],
      ['M', '2', '1'],
      ['T', '0', '3', '2'],
      ['T', '1', '3', '3'],
      ['A', 'Lara', '1', '1', 'S', 'AADADAGGA']
    ];
    gameManager.initData();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', 'M', '.'],
      ['.', 'A(Lara)', 'M'],
      ['.', '.', '.'],
      ['T(2)', 'T(3)', '.']
    ]);
  });

  it("should place map 4 / 5 with all data", () => {
    gameManager.data = [
      ['C', '4', '5'],
      ['M', '3', '4'],
      ['M', '3', '3'],
      ['T', '2', '2', '4'],
      ['T', '1', '1', '3'],
      ['A', 'Elie', '3', '1', 'S', 'AA'],
      ['A', 'Lara', '0', '0', 'S', 'AA']
    ];
    gameManager.initData();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['A(Lara)', '.', '.', '.'],
      ['.', 'T(3)', '.', 'A(Elie)'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', '.', 'M'],
      ['.', '.', '.', 'M']
    ]);
  });

  it("should throw error because map already declared", () => {
    gameManager.data = [
      ['C', '3', '4'],
      ['M', '1', '0'],
      ['C', '1', '1'],
      ['M', '2', '1'],
      ['T', '0', '3', '2'],
      ['T', '1', '3', '3'],
      ['A', 'Lara', '1', '1', 'S', 'AADADAGGA']
    ];
    expect(() => gameManager.initData()).toThrow(new Error("A map has already been declared in the game"));
  });

  it("should throw error because map is not passed first", () => {
    gameManager.data = [
      ['M', '1', '0'],
      ['C', '3', '4'],
      ['M', '2', '1'],
      ['T', '0', '3', '2'],
      ['T', '1', '3', '3'],
      ['A', 'Lara', '1', '1', 'S', 'AADADAGGA']
    ];
    expect(() => gameManager.initData()).toThrow(new Error("Please pass map information first"));
  });

})