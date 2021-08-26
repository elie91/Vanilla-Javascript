"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Treasure = void 0;
var Treasure = /** @class */ (function () {
    function Treasure(horizontalAxis, verticalAxis, quantity) {
        this._horizontalAxis = horizontalAxis;
        this._verticalAxis = verticalAxis;
        this._quantity = quantity;
    }
    Treasure.prototype.getHorizontalAxis = function () {
        return this._horizontalAxis;
    };
    Treasure.prototype.setHorizontalAxis = function (value) {
        this._horizontalAxis = value;
    };
    Treasure.prototype.getVerticalAxis = function () {
        return this._verticalAxis;
    };
    Treasure.prototype.setVerticalAxis = function (value) {
        this._verticalAxis = value;
    };
    Treasure.prototype.getQuantity = function () {
        return this._quantity;
    };
    Treasure.prototype.setQuantity = function (value) {
        this._quantity = value;
    };
    return Treasure;
}());
exports.Treasure = Treasure;
