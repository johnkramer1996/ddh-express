import { inject, injectable } from 'inversify'
import { Result } from '../../../../../shared/core/result'
import { TodoRepositoryPort } from '../../../repository/repository.port'
import { getStringFromUnknown } from '../../../../../shared/utils/get-error'
import { DeleteTodoCommand } from './delete-todo.command'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { IQueryHandler } from '@src/shared/core/cqs/query-handler'

export type DeleteTodoServiceResponse = Result<true> | Result<false, Error>

@injectable()
@CommandHandler(DeleteTodoCommand)
export class DeleteTodoService implements IQueryHandler<DeleteTodoCommand, DeleteTodoServiceResponse> {
  constructor(@inject(TODO_TYPES.REPOSITORY) private repository: TodoRepositoryPort) {}

  async execute(command: DeleteTodoCommand): Promise<DeleteTodoServiceResponse> {
    const todo = await this.repository.findOneById(command.todoId)
    if (!todo) return Result.fail(new TodoNotFoundException(command.todoId))

    todo.delete()

    try {
      await this.repository.delete(todo)

      return Result.ok<void>()
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
