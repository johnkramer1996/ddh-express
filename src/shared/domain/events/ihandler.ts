export interface IHandler<T = any> {
  handle(event: T): Promise<any>
}
