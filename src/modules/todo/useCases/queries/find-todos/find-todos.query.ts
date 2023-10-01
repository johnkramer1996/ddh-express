import { FindTodosParams } from '@src/modules/todo/repository/repository.port'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { TodoAttributes } from '@src/shared/infra/database/sequelize/models/todo.model'
import { FindTodosServiceResponse } from './find-todos.service'

export class FindTodosQuery extends PaginatedQueryBase implements FindTodosParams, IQuery<FindTodosServiceResponse> {
  readonly where: Partial<TodoAttributes>

  constructor(props: PaginatedParams<FindTodosQuery>) {
    super(props)
    this.where = {}
    if (props.where.text) this.where.text = props.where.text
    if (props.where.completed) this.where.completed = props.where.completed
  }
}
