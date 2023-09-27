export class Result<Success extends boolean, T = void> {
  public constructor(public isSuccess: Success, private _value?: T) {
    Object.freeze(this)
  }

  public getValue(): T {
    if (this._value === undefined) {
      throw new Error('Value is undefined')
    }
    return this._value
  }

  public static ok<U>(value?: U): Result<true, U> {
    return new Result(true, value)
  }

  public static fail<U>(error: U): Result<false, U> {
    return new Result(false, error)
  }
}
