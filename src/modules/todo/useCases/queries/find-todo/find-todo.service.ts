import { TodoEntity } from '@src/modules/todo/domain/todo.entity'
import { TodoRepositoryPort } from '@src/modules/todo/repository/repository.port'
import { Result } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { TYPES } from '@src/shared/infra/di/types'
import { inject, injectable } from 'inversify'
import { FindTodoQuery } from './find-todo.query'
import { getStringFromUnknown } from '@src/shared/utils/get-error'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'
import { IQueryHandler, QueryHandler } from '../../../../../shared/core/cqs/query-handler'

export type FindTodoServiceResponse = Result<true, TodoEntity> | Result<false, Error>

@injectable()
@QueryHandler(FindTodoQuery)
export class FindTodoService implements IQueryHandler<FindTodoQuery, FindTodoServiceResponse> {
  constructor(@inject(TODO_TYPES.REPOSITORY) private repository: TodoRepositoryPort) {}

  async execute(query: FindTodoQuery): Promise<FindTodoServiceResponse> {
    try {
      const todo = await this.repository.findOneById(query.todoId)
      if (!todo) return Result.fail(new TodoNotFoundException(query.todoId))

      return Result.ok(todo)
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
