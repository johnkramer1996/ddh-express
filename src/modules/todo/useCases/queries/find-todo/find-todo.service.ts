import { TodoEntity } from '@src/modules/todo/domain/todo.entity'
import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindTodoQuery } from './find-todo.query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '../../../../../shared/core/cqs/query-handler'
import { TodoService } from '../../todo.service'

type Return = TodoEntity
export type FindTodoServiceResponse = ResultWithError<TodoEntity>

@injectable()
@QueryHandler(FindTodoQuery)
export class FindTodoService extends TodoService<FindTodoQuery, Return> {
  async executeImpl(query: FindTodoQuery): Promise<Return> {
    const todo = await this.repository.findOneById(query.todoId)
    if (!todo) throw new NotFoundException()

    return todo
  }
}
