export class Treasure {
  private _horizontalAxis: number;
  private _verticalAxis: number;
  private _quantity: number;

  constructor(horizontalAxis: number, verticalAxis: number, quantity: number) {
    this._horizontalAxis = horizontalAxis;
    this._verticalAxis = verticalAxis;
    this._quantity = quantity;
  }

  public getHorizontalAxis(): number {
    return this._horizontalAxis;
  }

  public setHorizontalAxis(value: number) {
    this._horizontalAxis = value;
  }

  public getVerticalAxis(): number {
    return this._verticalAxis;
  }

  public setVerticalAxis(value: number) {
    this._verticalAxis = value;
  }

  public getQuantity(): number {
    return this._quantity;
  }

  public setQuantity(value: number) {
    this._quantity = value;
  }
}