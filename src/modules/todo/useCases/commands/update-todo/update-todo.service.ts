import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { UpdateTodoCommand } from './update-todo.command'
import { Text } from '@src/modules/todo/domain/value-objects/text.value-object'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { TodoService } from '../../todo.service'

type Return = void
export type UpdateTodoServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(UpdateTodoCommand)
export class UpdateTodoService extends TodoService<UpdateTodoCommand, Return> {
  async executeImpl(command: UpdateTodoCommand): Promise<Return> {
    const todo = await this.postRepo.findOneById(command.todoId)
    if (!todo) throw new NotFoundException()

    if (command.text !== undefined) todo.updateText({ text: new Text({ value: command.text }) })
    if (command.completed !== undefined) todo.updateCompleted(command.completed)

    await this.postRepo.save(todo)
  }
}
