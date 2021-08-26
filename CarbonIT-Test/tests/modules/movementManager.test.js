const {GameMap} = require("../../build/classes/GameMap.class");
const {GameManager} = require("../../build/modules/GameManager");
const {MovementManager} = require("../../build/modules/MovementManager");


describe("MovementManager", () => {

  const gameMap = new GameMap();
  const gameManager = new GameManager('input.txt', gameMap);

  it("should move Lara AAGADA", () => {
    gameManager.data = [
      ['C', '4', '5'],
      ['M', '3', '4'],
      ['M', '3', '3'],
      ['T', '2', '2', '4'],
      ['T', '1', '1', '3'],
      ['A', 'Lara', '0', '0', 'S', 'AAGADA']
    ];
    gameManager.initData();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['A(Lara)', '.', '.', '.'],
      ['.', 'T(3)', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', '.', 'M'],
      ['.', '.', '.', 'M']
    ]);
    const movementManager = new MovementManager(gameMap);
    movementManager.initAdventurersMovements();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', '.', '.'],
      ['.', 'T(3)', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', 'A(Lara)', '.', 'M'],
      ['.', '.', '.', 'M']
    ]);
  });

  it("should move Lara AADADAAGA", () => {
    gameManager.data = [
      ['C', '4', '5'],
      ['M', '3', '4'],
      ['M', '3', '3'],
      ['T', '2', '2', '4'],
      ['T', '1', '1', '3'],
      ['A', 'Lara', '0', '4', 'N', 'AADADAAGA']
    ];
    gameManager.initData();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', '.', '.'],
      ['.', 'T(3)', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', '.', 'M'],
      ['A(Lara)', '.', '.', 'M']
    ]);
    const movementManager = new MovementManager(gameMap);
    movementManager.initAdventurersMovements();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', '.', '.'],
      ['.', 'T(3)', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', '.', 'M'],
      ['.', '.', 'A(Lara)', 'M']
    ]);
  });

  it("should move Lara and get 2 treasures", () => {
    gameManager.data = [
      ['C', '4', '5'],
      ['M', '3', '4'],
      ['M', '3', '3'],
      ['T', '2', '2', '4'],
      ['T', '1', '1', '3'],
      ['A', 'Lara', '0', '4', 'N', 'AAADAADAA']
    ];
    gameManager.initData();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', '.', '.'],
      ['.', 'T(3)', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', '.', 'M'],
      ['A(Lara)', '.', '.', 'M']
    ]);
    const movementManager = new MovementManager(gameMap);
    movementManager.initAdventurersMovements();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', '.', '.'],
      ['.', 'T(2)', '.', '.'],
      ['.', '.', 'T(3)', '.'],
      ['.', '.', 'A(Lara)', 'M'],
      ['.', '.', '.', 'M']
    ]);

    const treasure1 = gameMap.getTreasureInstance(2, 2);
    expect(treasure1.getQuantity()).toBe(3);

    const treasure2 = gameMap.getTreasureInstance(1, 1);
    expect(treasure2.getQuantity()).toBe(2);
  });

  it("should not move if mountain", () => {
    gameManager.data = [
      ['C', '4', '5'],
      ['M', '3', '4'],
      ['M', '3', '3'],
      ['T', '2', '2', '4'],
      ['T', '1', '1', '1'],
      ['A', 'Lara', '0', '4', 'E', 'AAA']
    ];
    gameManager.initData();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', '.', '.'],
      ['.', 'T(1)', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', '.', 'M'],
      ['A(Lara)', '.', '.', 'M']
    ]);
    const movementManager = new MovementManager(gameMap);
    movementManager.initAdventurersMovements();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', '.', '.'],
      ['.', 'T(1)', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', '.', 'M'],
      ['.', '.', 'A(Lara)', 'M']
    ]);
  });

  it("should throw error if mouvement not authorized", () => {
    gameManager.data = [
      ['C', '4', '5'],
      ['M', '3', '4'],
      ['M', '3', '3'],
      ['T', '2', '2', '4'],
      ['T', '1', '1', '1'],
      ['A', 'Lara', '0', '4', 'E', 'AAAGAH']
    ];
    gameManager.initData();
    const movementManager = new MovementManager(gameMap);
    const adventurer = gameMap.getAdventurerInstance(0, 4);
    expect(movementManager.launchMovements(adventurer)).rejects.toThrow(new Error('Movement not authorized'))
  });

  it("should throw error if orientation not authorized", () => {
    gameManager.data = [
      ['C', '4', '5'],
      ['M', '3', '4'],
      ['M', '3', '3'],
      ['T', '2', '2', '4'],
      ['T', '1', '1', '1'],
      ['A', 'Lara', '0', '4', 'X', 'AAAGAH']
    ];
    gameManager.initData();
    const movementManager = new MovementManager(gameMap);
    const adventurer = gameMap.getAdventurerInstance(0, 4);
    expect(movementManager.launchMovements(adventurer)).rejects.toThrow(new Error('Orientation not authorized'))
  });


  /*it("should remove treasure when quantity is 0", () => {
    gameManager.data = [
      ['C', '4', '5'],
      ['M', '3', '4'],
      ['M', '3', '3'],
      ['T', '2', '2', '4'],
      ['T', '1', '1', '1'],
      ['A', 'Lara', '0', '4', 'N', 'AAADAAGA']
    ];
    gameManager.initData();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', '.', '.'],
      ['.', 'T(1)', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', '.', 'M'],
      ['A(Lara)', '.', '.', 'M']
    ]);
    const movementManager = new MovementManager(gameMap);
    movementManager.initAdventurersMovements();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', 'A(Lara)', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', '.', 'M'],
      ['.', '.', '.', 'M']

    ]);

    //const treasure2 = gameMap.getTreasureInstance(1, 1);
    //expect(treasure2.getQuantity()).toBe(0);
  });*/


  /* it("should not move if mountain and continue execution", () => {
    gameManager.data = [
      ['C', '4', '5'],
      ['M', '3', '4'],
      ['M', '3', '3'],
      ['T', '2', '2', '4'],
      ['T', '1', '1', '1'],
      ['A', 'Lara', '0', '4', 'E', 'AAAGA']
    ];
    gameManager.initData();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', '.', '.'],
      ['.', 'T(1)', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', '.', 'M'],
      ['A(Lara)', '.', '.', 'M']
    ]);
    const movementManager = new MovementManager(gameMap);
    movementManager.initAdventurersMovements();
    expect(gameManager.gameMap.getMap()).toEqual([
      ['.', '.', '.', '.'],
      ['.', 'T(1)', '.', '.'],
      ['.', '.', 'T(4)', '.'],
      ['.', '.', 'A(Lara)', 'M'],
      ['.', '.', '.', 'M']
    ]);
  });*/

})