"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adventurer = void 0;
var Adventurer = /** @class */ (function () {
    function Adventurer(name, horizontalAxis, verticalAxis, orientation, movements) {
        this._name = name;
        this._horizontalAxis = horizontalAxis;
        this._verticalAxis = verticalAxis;
        this._orientation = orientation;
        this._movements = movements.split('');
        this._appearanceOrder = null;
        this._collectedTreasures = 0;
    }
    Adventurer.prototype.getName = function () {
        return this._name;
    };
    Adventurer.prototype.setName = function (value) {
        this._name = value;
    };
    Adventurer.prototype.getHorizontalAxis = function () {
        return this._horizontalAxis;
    };
    Adventurer.prototype.setHorizontalAxis = function (value) {
        this._horizontalAxis = value;
    };
    Adventurer.prototype.getVerticalAxis = function () {
        return this._verticalAxis;
    };
    Adventurer.prototype.setVerticalAxis = function (value) {
        this._verticalAxis = value;
    };
    Adventurer.prototype.getOrientation = function () {
        return this._orientation;
    };
    Adventurer.prototype.setOrientation = function (value) {
        this._orientation = value;
    };
    Adventurer.prototype.getMovements = function () {
        return this._movements;
    };
    Adventurer.prototype.getAppearanceOrder = function () {
        return this._appearanceOrder;
    };
    Adventurer.prototype.setAppearanceOrder = function (value) {
        this._appearanceOrder = value;
    };
    Adventurer.prototype.getCollectedTreasures = function () {
        return this._collectedTreasures;
    };
    Adventurer.prototype.addCollectedTreasures = function () {
        this._collectedTreasures = this._collectedTreasures + 1;
    };
    return Adventurer;
}());
exports.Adventurer = Adventurer;
