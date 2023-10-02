import { TodoEntity } from '@src/modules/todo/domain/todo.entity'
import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindTodosQuery } from './find-todos.query'
import { QueryHandler } from '../../../../../shared/core/cqs/query-handler'
import { TodoService } from '../../todo.service'

type Return = Paginated<TodoEntity>
export type FindTodosServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindTodosQuery)
export class FindTodosService extends TodoService<FindTodosQuery, Return> {
  async executeImpl(query: FindTodosQuery): Promise<Return> {
    const todos = await this.repository.findAllPaginated(query)

    return todos
  }
}
