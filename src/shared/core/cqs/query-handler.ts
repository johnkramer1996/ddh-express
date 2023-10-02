import 'reflect-metadata'
import { IQuery } from './query.interface'

export const QUERY_HANDLER_METADATA = Symbol.for('__queryHandler__')

export interface IQueryHandler<TQuery extends IQuery<TResult>, TResult> {
  execute(command: TQuery): Promise<TResult>
}

export const QueryHandler = (command: NewableFunction): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(QUERY_HANDLER_METADATA, target, (command as unknown as Function).prototype)
  }
}
