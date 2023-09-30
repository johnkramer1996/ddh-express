import { FindTodosParams } from '@src/modules/todo/repository/repository.port'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { TodoAttributes } from '@src/shared/infra/database/sequelize/models/todo.model'
import { FindUsersServiceResponse } from './find-users.service'

export class FindUsersQuery extends PaginatedQueryBase implements FindTodosParams, IQuery<FindUsersServiceResponse> {
  readonly where: Partial<TodoAttributes>

  constructor(props: PaginatedParams<FindUsersQuery>) {
    super(props)
    this.where = {}
    if (props.where.text) this.where.text = props.where.text
    if (props.where.completed) this.where.completed = props.where.completed
  }
}
