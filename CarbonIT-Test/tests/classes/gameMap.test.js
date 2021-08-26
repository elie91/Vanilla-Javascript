const { GameMap } = require("../../build/classes/GameMap.class");
const { Mountain } = require("../../build/classes/Moutain.class");
const { Treasure } = require("../../build/classes/Treasure.class");
const { Adventurer } = require("../../build/classes/Adventurer.class");

describe("GameMap", () => {

    const mock = new GameMap();
    mock.setHeight(4);
    mock.setWidth(3);

    it("should have map set by width and height", () => {
        expect(mock.getMap()).toEqual([
            [".", ".", "."],
            [".", ".", "."],
            [".", ".", "."],
            [".", ".", "."]
        ]);
    });

    it("should add moutain to map", () => {
        const mountain = new Mountain(1, 0);
        mock.addMountain(mountain);
        expect(mock.getMap()).toEqual([
            [".", "M", "."],
            [".", ".", "."],
            [".", ".", "."],
            [".", ".", "."]
        ]);
    });

    it("should add treasure to map", () => {
        const treasure = new Treasure(0, 3, 2);
        mock.addTreasure(treasure);
        expect(mock.getMap()).toEqual([
            [".", "M", "."],
            [".", ".", "."],
            [".", ".", "."],
            ["T(2)", ".", "."]
        ]);
    });

    it("should add adventurer to map", () => {
        const adventurer = new Adventurer("Elie", 1, 1, "S", "AADADAGGA");
        mock.addAdventurer(adventurer);
        expect(mock.getMap()).toEqual([
            [".", "M", "."],
            [".", "A(Elie)", "."],
            [".", ".", "."],
            ["T(2)", ".", "."]
        ]);
    });

    it("should throw error because adventurer is outside the map", () => {
        const adventurer = new Adventurer("Elie", 1, 4, "S", "AADADAGGA");
        expect(() => mock.addAdventurer(adventurer)).toThrow("Les coordonées saisies pour l'élement A - 1 - 4 sont invalides")
    });

    it("should throw error because treasure is outside the map", () => {
        const treasure = new Treasure(3, 3, 2);
        expect(() => mock.addTreasure(treasure)).toThrow("Les coordonées saisies pour l'élement T - 3 - 3 sont invalides")
    });

});