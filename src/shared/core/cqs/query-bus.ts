import { Container, injectable } from 'inversify'
import { IQueryHandler, QUERY_HANDLER_METADATA } from './query-handler'
import { IQuery } from './query.interface'

export interface IQueryBus {
  execute<TResult>(command: IQuery<TResult>): Promise<TResult>
}

@injectable()
export class QueryBus implements IQueryBus {
  constructor(private container: Container) {}

  execute<TResult>(command: IQuery<TResult>): Promise<TResult> {
    const handlerType = Reflect.getMetadata(QUERY_HANDLER_METADATA, command)
    const handler = this.container.get<IQueryHandler<IQuery<TResult>, TResult>>(handlerType)
    return handler.execute(command)
  }
}
