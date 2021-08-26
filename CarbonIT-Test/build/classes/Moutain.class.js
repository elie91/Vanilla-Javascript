"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mountain = void 0;
var Mountain = /** @class */ (function () {
    function Mountain(horizontalAxis, verticalAxis) {
        this._horizontalAxis = horizontalAxis;
        this._verticalAxis = verticalAxis;
    }
    Mountain.prototype.getHorizontalAxis = function () {
        return this._horizontalAxis;
    };
    Mountain.prototype.setHorizontalAxis = function (value) {
        this._horizontalAxis = value;
    };
    Mountain.prototype.getVerticalAxis = function () {
        return this._verticalAxis;
    };
    Mountain.prototype.setVerticalAxis = function (value) {
        this._verticalAxis = value;
    };
    return Mountain;
}());
exports.Mountain = Mountain;
