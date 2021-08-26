"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMap = void 0;
var enums_1 = require("../enums/enums");
/**
 * Classe responsable de la gestion de la carte
 */
var GameMap = /** @class */ (function () {
    function GameMap() {
        this._width = 0;
        this._height = 0;
        this._map = [];
        this._mountains = [];
        this._treasures = [];
        this._adventurers = [];
    }
    GameMap.prototype.setWidth = function (value) {
        this._width = value;
        this.setMap();
    };
    GameMap.prototype.setHeight = function (value) {
        this._height = value;
        this.setMap();
    };
    GameMap.prototype.getWidth = function () {
        return this._width;
    };
    GameMap.prototype.getHeight = function () {
        return this._height;
    };
    GameMap.prototype.getMap = function () {
        return this._map;
    };
    /**
     * Generate a two dimensional array based on map height and length
     */
    GameMap.prototype.setMap = function () {
        var _this = this;
        this._map = Array.from({
            length: this._height
        }, function () { return new Array(_this._width).fill("."); });
    };
    GameMap.prototype.addMountain = function (mountain) {
        this.checkIfCoordinatesValid(mountain, enums_1.GameTypeEnum.M);
        this._mountains = __spreadArray(__spreadArray([], this._mountains), [mountain]);
        this._map[mountain.getVerticalAxis()][mountain.getHorizontalAxis()] = "M";
    };
    GameMap.prototype.addTreasure = function (treasure) {
        this.checkIfCoordinatesValid(treasure, enums_1.GameTypeEnum.T);
        this._treasures = __spreadArray(__spreadArray([], this._treasures), [treasure]);
        this._map[treasure.getVerticalAxis()][treasure.getHorizontalAxis()] = "T(" + treasure.getQuantity() + ")";
    };
    GameMap.prototype.addAdventurer = function (adventurer) {
        this.checkIfCoordinatesValid(adventurer, enums_1.GameTypeEnum.A);
        this._adventurers = __spreadArray(__spreadArray([], this._adventurers), [adventurer]);
        this.placeAdventurer(adventurer);
    };
    GameMap.prototype.placeAdventurer = function (adventurer) {
        this._map[adventurer.getVerticalAxis()][adventurer.getHorizontalAxis()] = "A(" + adventurer.getName() + ")";
    };
    GameMap.prototype.getAdventurers = function () {
        return this._adventurers;
    };
    GameMap.prototype.getMountains = function () {
        return this._mountains;
    };
    GameMap.prototype.getTreasures = function () {
        return this._treasures;
    };
    /**
     * Retourne l'instance du trésor existant aux coordonées passées en params
     * @param verticalAxis
     * @param horizontalAxis
     */
    GameMap.prototype.getTreasureInstance = function (verticalAxis, horizontalAxis) {
        return this
            .getTreasures()
            .filter(function (treasure) {
            if (treasure.getVerticalAxis() === verticalAxis && treasure.getHorizontalAxis() === horizontalAxis) {
                return true;
            }
        })[0];
    };
    /**
     * Retourne l'instance de l'aventurier existant aux coordonées passées en params
     * @param verticalAxis
     * @param horizontalAxis
     */
    GameMap.prototype.getAdventurerInstance = function (verticalAxis, horizontalAxis) {
        return this
            .getAdventurers()
            .filter(function (adventurer) {
            if (adventurer.getVerticalAxis() === verticalAxis && adventurer.getHorizontalAxis() === horizontalAxis) {
                return true;
            }
        })[0];
    };
    GameMap.prototype.removeTreasureQuantity = function (treasure) {
        var nextQuantity = treasure.getQuantity() - 1;
        treasure.setQuantity(nextQuantity);
        if (nextQuantity === 0) {
            this._map[treasure.getVerticalAxis()][treasure.getHorizontalAxis()] = ".";
            this._treasures = this._treasures.filter(function (t) {
                if (t.getHorizontalAxis() === treasure.getHorizontalAxis() && t.getVerticalAxis() === treasure.getVerticalAxis()) {
                    return false;
                }
                else {
                    return true;
                }
            });
        }
        else {
            this._map[treasure.getVerticalAxis()][treasure.getHorizontalAxis()] = "T(" + treasure.getQuantity() + ")";
        }
    };
    /**
     * Vérifie si l'objet que l'on souhaite ajouter à la carte possède des coordonées valides
     * C'est à dire que sa latitude et longitude rentrent dans la carte
     * @param instance
     * @param name
     */
    GameMap.prototype.checkIfCoordinatesValid = function (instance, name) {
        if ((instance.getHorizontalAxis() > this._width - 1) || (instance.getVerticalAxis() > this._height - 1)) {
            throw new Error("Les coordon\u00E9es saisies pour l'\u00E9lement " + name + " - " + instance.getHorizontalAxis() + " - " + instance.getVerticalAxis() + " sont invalides");
        }
        return true;
    };
    return GameMap;
}());
exports.GameMap = GameMap;
