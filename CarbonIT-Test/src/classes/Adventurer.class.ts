import { MovementEnum, OrientationEnum } from "../enums/enums";

export class Adventurer {
  private _name: string;
  private _horizontalAxis: number;
  private _verticalAxis: number;
  private _orientation: string;
  private _movements: string[];
  private _appearanceOrder: number | null;
  private _collectedTreasures: number;

  constructor(name: string, horizontalAxis: number, verticalAxis: number, orientation: string, movements: string) {
    this._name = name;
    this._horizontalAxis = horizontalAxis;
    this._verticalAxis = verticalAxis;
    this._orientation = orientation;
    this._movements = movements.split('');
    this._appearanceOrder = null;
    this._collectedTreasures = 0;
  }

  getName(): string {
    return this._name;
  }

  setName(value: string) {
    this._name = value;
  }

  getHorizontalAxis(): number {
    return this._horizontalAxis;
  }

  setHorizontalAxis(value: number) {
    this._horizontalAxis = value;
  }

  getVerticalAxis(): number {
    return this._verticalAxis;
  }

  setVerticalAxis(value: number) {
    this._verticalAxis = value;
  }

  getOrientation(): string {
    return this._orientation;
  }

  setOrientation(value: OrientationEnum) {
    this._orientation = value;
  }

  getMovements(): string[] {
    return this._movements;
  }

  getAppearanceOrder(): number | null {
    return this._appearanceOrder;
  }

  setAppearanceOrder(value: number) {
    this._appearanceOrder = value;
  }

  public getCollectedTreasures() {
    return this._collectedTreasures;
  }

  public addCollectedTreasures() {
    this._collectedTreasures = this._collectedTreasures + 1;
  }


}