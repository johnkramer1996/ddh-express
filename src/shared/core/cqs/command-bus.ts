import { Container, injectable } from 'inversify'
import { QUERY_HANDLER_METADATA } from './query-handler'
import { ICommand } from './command.interface'
import { ICommandHandler } from './command-handler'

export interface ICommandBus {
  execute<TResult>(command: ICommand<TResult>): Promise<TResult>
}

@injectable()
export class CommandBus implements ICommandBus {
  constructor(private container: Container) {}

  execute<TResult>(command: ICommand<TResult>): Promise<TResult> {
    const handlerType = Reflect.getMetadata(QUERY_HANDLER_METADATA, command)
    const handler = this.container.get<ICommandHandler<ICommand<TResult>, TResult>>(handlerType)
    return handler.execute(command)
  }
}
