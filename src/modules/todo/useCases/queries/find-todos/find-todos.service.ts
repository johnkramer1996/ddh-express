import { TodoEntity } from '@src/modules/todo/domain/todo.entity'
import { TodoRepositoryPort } from '@src/modules/todo/repository/repository.port'
import { Result } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { TYPES } from '@src/shared/infra/di/types'
import { inject, injectable } from 'inversify'
import { FindTodosQuery } from './find-todos.query'
import { getStringFromUnknown } from '@src/shared/utils/get-error'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'
import { IQueryHandler, QueryHandler } from '../../../../../shared/core/cqs/query-handler'

export type FindTodosServiceResponse = Result<true, Paginated<TodoEntity>> | Result<false, Error>

@injectable()
@QueryHandler(FindTodosQuery)
export class FindTodosService implements IQueryHandler<FindTodosQuery, FindTodosServiceResponse> {
  constructor(@inject(TODO_TYPES.REPOSITORY) private repository: TodoRepositoryPort) {}

  async execute(query: FindTodosQuery): Promise<FindTodosServiceResponse> {
    try {
      const todos = await this.repository.findAllPaginated(query)

      return Result.ok(todos)
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
