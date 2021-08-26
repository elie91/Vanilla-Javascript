export class Mountain {
  private _horizontalAxis: number;
  private _verticalAxis: number;


  constructor(horizontalAxis: number, verticalAxis: number) {
    this._horizontalAxis = horizontalAxis;
    this._verticalAxis = verticalAxis;
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
}