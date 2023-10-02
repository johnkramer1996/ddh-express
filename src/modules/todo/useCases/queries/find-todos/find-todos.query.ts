import { FindTodosParams } from '@src/modules/todo/repository/repository.port'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindTodosServiceResponse } from './find-todos.service'
import { TodoModelAttributes } from '@src/modules/todo/domain/todo.types'

export class FindTodosQuery extends PaginatedQueryBase implements FindTodosParams, IQuery<FindTodosServiceResponse> {
  declare response?: FindTodosServiceResponse
  readonly where: Partial<TodoModelAttributes>

  constructor(props: PaginatedParams<FindTodosQuery>) {
    super(props)
    this.where = {}
    if (props.where.text) this.where.text = props.where.text
    if (props.where.completed) this.where.completed = props.where.completed
  }
}
