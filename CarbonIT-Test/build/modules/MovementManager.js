"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementManager = void 0;
var enums_1 = require("../enums/enums");
var MovementManager = /** @class */ (function () {
    function MovementManager(gameMap) {
        this.gameMap = gameMap;
        //console.log("start map", this.gameMap.getMap());
    }
    /**
     * Boucle sur les aventuriers
     * Vérifie que l'orientation et que les mouvements sont correctes
     * Déplace l'aventurier dans la carte
     *
     */
    MovementManager.prototype.initAdventurersMovements = function () {
        var _this = this;
        var asyncMovements = [];
        this.gameMap.getAdventurers().forEach(function (adventurer) {
            asyncMovements.push(_this.launchMovements(adventurer));
        });
        Promise.all(asyncMovements);
        //.then(() => console.log('end map', this.gameMap.getMap()))
    };
    /**
     * Lance tous les mouvements d'un aventurier
     * @param adventurer
     * @private
     */
    MovementManager.prototype.launchMovements = function (adventurer) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        if (!(adventurer.getOrientation() in enums_1.OrientationEnum)) {
                            throw new Error('Orientation not authorized');
                        }
                        adventurer.getMovements().forEach(function (move) {
                            if (!(move in enums_1.MovementEnum)) {
                                throw new Error('Movement not authorized');
                            }
                            if (move === enums_1.MovementEnum.A) {
                                switch (adventurer.getOrientation()) {
                                    case enums_1.OrientationEnum.N:
                                        _this.moveAdventurer(adventurer, -1, null);
                                        break;
                                    case enums_1.OrientationEnum.S:
                                        _this.moveAdventurer(adventurer, +1, null);
                                        break;
                                    case enums_1.OrientationEnum.E:
                                        _this.moveAdventurer(adventurer, null, +1);
                                        break;
                                    case enums_1.OrientationEnum.W:
                                        _this.moveAdventurer(adventurer, null, -1);
                                        break;
                                }
                            }
                            if (move === enums_1.MovementEnum.D) {
                                switch (adventurer.getOrientation()) {
                                    case enums_1.OrientationEnum.N:
                                        adventurer.setOrientation(enums_1.OrientationEnum.E);
                                        break;
                                    case enums_1.OrientationEnum.S:
                                        adventurer.setOrientation(enums_1.OrientationEnum.W);
                                        break;
                                    case enums_1.OrientationEnum.E:
                                        adventurer.setOrientation(enums_1.OrientationEnum.S);
                                        break;
                                    case enums_1.OrientationEnum.W:
                                        adventurer.setOrientation(enums_1.OrientationEnum.N);
                                        break;
                                }
                            }
                            if (move === enums_1.MovementEnum.G) {
                                switch (adventurer.getOrientation()) {
                                    case enums_1.OrientationEnum.N:
                                        adventurer.setOrientation(enums_1.OrientationEnum.W);
                                        break;
                                    case enums_1.OrientationEnum.S:
                                        adventurer.setOrientation(enums_1.OrientationEnum.E);
                                        break;
                                    case enums_1.OrientationEnum.E:
                                        adventurer.setOrientation(enums_1.OrientationEnum.N);
                                        break;
                                    case enums_1.OrientationEnum.W:
                                        adventurer.setOrientation(enums_1.OrientationEnum.S);
                                        break;
                                }
                            }
                        });
                        resolve(true);
                    })];
            });
        });
    };
    MovementManager.prototype.moveAdventurer = function (adventurer, verticalAxis, horizontalAxis) {
        var nextCase = '';
        var nextCaseVerticalAxis = 0;
        var nextCaseHorizontalAxis = 0;
        this.updateCurrentCase(adventurer);
        if (verticalAxis) {
            nextCaseVerticalAxis = adventurer.getVerticalAxis() + verticalAxis;
            nextCaseHorizontalAxis = adventurer.getHorizontalAxis();
            this.checkIfMovementValid(nextCaseHorizontalAxis, nextCaseVerticalAxis, adventurer);
            nextCase = this.gameMap.getMap()[nextCaseVerticalAxis][adventurer.getHorizontalAxis()];
        }
        else if (horizontalAxis) {
            nextCaseHorizontalAxis = adventurer.getHorizontalAxis() + horizontalAxis;
            nextCaseVerticalAxis = adventurer.getVerticalAxis();
            this.checkIfMovementValid(nextCaseHorizontalAxis, nextCaseVerticalAxis, adventurer);
            nextCase = this.gameMap.getMap()[adventurer.getVerticalAxis()][nextCaseHorizontalAxis];
        }
        if (nextCase.startsWith(enums_1.GameTypeEnum.T)) {
            var treasure = this.gameMap.getTreasureInstance(nextCaseVerticalAxis, nextCaseHorizontalAxis);
            this.gameMap.removeTreasureQuantity(treasure);
            adventurer.addCollectedTreasures();
            adventurer.setVerticalAxis(nextCaseVerticalAxis);
            adventurer.setHorizontalAxis(nextCaseHorizontalAxis);
            if (treasure.getQuantity() === 0) {
                this.gameMap.placeAdventurer(adventurer);
            }
        }
        else if (nextCase.startsWith(enums_1.GameTypeEnum.M)) {
            //ignore movement if nextCase is mountain
            //place adventurer on previous case
            this.gameMap.placeAdventurer(adventurer);
            return;
        }
        else if (nextCase.startsWith(enums_1.GameTypeEnum.A)) {
            //ignore movement if nextCase is adventurer
            //place adventurer on previous case
            this.gameMap.placeAdventurer(adventurer);
            return;
        }
        else {
            adventurer.setVerticalAxis(nextCaseVerticalAxis);
            adventurer.setHorizontalAxis(nextCaseHorizontalAxis);
            this.gameMap.placeAdventurer(adventurer);
        }
    };
    /**
     * Récupère la position actuelle de l'aventurier
     * S'il n'y a pas de trésor ou de montagne sur la case, remplace la case par un point car l'aventurier va se déplacer
     * @param adventurer
     */
    MovementManager.prototype.updateCurrentCase = function (adventurer) {
        var currentCase = this.gameMap.getMap()[adventurer.getVerticalAxis()][adventurer.getHorizontalAxis()];
        if (!currentCase.startsWith('T') && !currentCase.startsWith('M')) {
            this.gameMap.getMap()[adventurer.getVerticalAxis()][adventurer.getHorizontalAxis()] = ".";
        }
    };
    /**
     * Vérifie si le mouvement ne sort pas de la carte
     * @param horizontalAxis
     * @param verticalAxis
     * @param adventurer
     */
    MovementManager.prototype.checkIfMovementValid = function (horizontalAxis, verticalAxis, adventurer) {
        if ((horizontalAxis > this.gameMap.getWidth() - 1) || (verticalAxis > this.gameMap.getHeight() - 1)) {
            throw new Error("Les mouvements " + adventurer.getMovements().join('') + " de l'aventurier " + adventurer.getName() + " sont invalides");
        }
        return true;
    };
    return MovementManager;
}());
exports.MovementManager = MovementManager;
