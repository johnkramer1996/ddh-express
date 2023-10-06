import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { DeleteTodoCommand } from './delete-todo.command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { TodoService } from '../../todo.service'

type Return = void
export type DeleteTodoServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(DeleteTodoCommand)
export class DeleteTodoService extends TodoService<DeleteTodoCommand, Return> {
  async executeImpl(command: DeleteTodoCommand): Promise<Return> {
    const todo = await this.postRepo.findOneById(command.todoId)
    if (!todo) throw new NotFoundException()

    todo.delete()

    await this.postRepo.delete(todo)
  }
}
