import { inject, injectable } from 'inversify'
import { Result } from '../../../../../shared/core/result'
import { TYPES } from '../../../../../shared/infra/di/types'
import { TodoRepositoryPort } from '../../../repository/repository.port'
import { Paginated } from '../../../../../shared/domain/repository.port'
import { TodoEntity } from '../../../domain/todo.entity'
import { FindTodosQuery } from './find-todos.query'
import { getStringFromUnknown } from '../../../../../shared/utils/get-error'

type Response = Result<true, Paginated<TodoEntity>> | Result<false, Error>

@injectable()
export class FindTodosService {
  constructor(@inject(TYPES.TODO_REPOSITORY) private repository: TodoRepositoryPort) {}

  async execute(query: FindTodosQuery): Promise<Response> {
    try {
      const todos = await this.repository.findAllPaginated(query)

      return Result.ok(todos)
    } catch (err) {
      return Result.fail(new Error(getStringFromUnknown(err)))
    }
  }
}
