import 'reflect-metadata'
import { ICommand } from './command.interface'

export const COMMAND_HANDLER_METADATA = Symbol.for('__queryHandler__')

export interface ICommandHandler<TCommand extends ICommand<TResult>, TResult> {
  execute(command: TCommand): Promise<TResult>
}

export const CommandHandler = (command: NewableFunction): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA, target, (command as unknown as Function).prototype)
  }
}
