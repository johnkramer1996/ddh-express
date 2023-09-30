import { inject, injectable } from 'inversify'
import { Result } from '../../../../../shared/core/result'
import { TYPES } from '../../../../../shared/infra/di/types'
import { TodoRepositoryPort } from '../../../repository/repository.port'
import { Paginated } from '../../../../../shared/domain/repository.port'
import { TodoEntity } from '../../../domain/todo.entity'
import { getStringFromUnknown } from '../../../../../shared/utils/get-error'
import { DeleteTodoCommand } from './delete-todo.command'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'

type Response = Result<true> | Result<false, Error>

@injectable()
export class DeleteTodoService {
  constructor(@inject(TODO_TYPES.REPOSITORY) private repository: TodoRepositoryPort) {}

  async execute(command: DeleteTodoCommand): Promise<Response> {
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
