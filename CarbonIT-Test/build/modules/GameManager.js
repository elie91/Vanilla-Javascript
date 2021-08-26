"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
var fs_1 = __importDefault(require("fs"));
var enums_1 = require("../enums/enums");
var Moutain_class_1 = require("../classes/Moutain.class");
var Treasure_class_1 = require("../classes/Treasure.class");
var Adventurer_class_1 = require("../classes/Adventurer.class");
var GameManager = /** @class */ (function () {
    function GameManager(filename, gameMap) {
        this.data = [];
        this.filename = filename;
        this.gameMap = gameMap;
    }
    /**
     * Read file, split and trim values
     */
    GameManager.prototype.loadData = function () {
        //read the file and split by line break
        var data = fs_1.default.readFileSync(this.filename, { encoding: 'utf-8' }).split('\n');
        //remove commented and empty lines
        data = data.filter(function (row) { return (!row.startsWith('#') && row.length > 0); });
        //split each line by - separator and trim the value
        this.data = data.map(function (row) {
            var rowData = row.split('-');
            return rowData.map(function (value) { return value.trim(); });
        });
        this.initData();
    };
    /**
     * Set map height and width
     */
    GameManager.prototype.initMap = function () {
        if (this.data[0][0] !== enums_1.GameTypeEnum.C) {
            throw new Error("Please pass map information first");
        }
        // + convert string to int in javascript
        this.gameMap.setWidth(+this.data[0][1]);
        this.gameMap.setHeight(+this.data[0][2]);
    };
    GameManager.prototype.initData = function () {
        var _this = this;
        this.initMap();
        this.data.forEach(function (row, index) {
            //skip map data because already set in initMap function
            if (index === 0)
                return;
            _this.insertMapData(row, index);
        });
    };
    GameManager.prototype.insertMapData = function (row, index) {
        switch (row[0]) {
            case enums_1.GameTypeEnum.M:
                this.gameMap.addMountain(new Moutain_class_1.Mountain(+row[1], +row[2]));
                break;
            case enums_1.GameTypeEnum.T:
                this.gameMap.addTreasure(new Treasure_class_1.Treasure(+row[1], +row[2], +row[3]));
                break;
            case enums_1.GameTypeEnum.A:
                var adventurer = new Adventurer_class_1.Adventurer(row[1], +row[2], +row[3], row[4], row[5]);
                adventurer.setAppearanceOrder(index);
                this.gameMap.addAdventurer(adventurer);
                break;
            case enums_1.GameTypeEnum.C:
                throw new Error("A map has already been declared in the game");
        }
    };
    GameManager.prototype.output = function () {
        var mountainsOutput = this.gameMap.getMountains().map(function (mountain) {
            return "M - " + mountain.getHorizontalAxis() + " - " + mountain.getVerticalAxis() + "\n";
        });
        var treasuresOutput = this.gameMap.getTreasures().map(function (treasure) {
            return "T - " + treasure.getHorizontalAxis() + " - " + treasure.getVerticalAxis() + " - " + treasure.getQuantity() + " \n";
        });
        var adventurersOutput = this.gameMap.getAdventurers().map(function (adventurer) {
            return "A - " + adventurer.getName() + " - " + adventurer.getHorizontalAxis() + " - " + adventurer.getVerticalAxis() + " - " + adventurer.getOrientation() + " - " + adventurer.getCollectedTreasures() + " \n";
        });
        fs_1.default.writeFile('output.txt', "C - " + this.gameMap.getWidth() + " - " + this.gameMap.getHeight() + "\n" + mountainsOutput + treasuresOutput + adventurersOutput, function (err) {
            if (err)
                throw err;
            console.log('Saved!');
        });
    };
    return GameManager;
}());
exports.GameManager = GameManager;
