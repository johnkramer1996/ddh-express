import { FindTodosParams } from '@src/modules/todo/repository/repository.port'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { TodoAttributes } from '@src/shared/infra/database/sequelize/models/todo.model'

export class FindTodosQuery extends PaginatedQueryBase implements FindTodosParams {
  readonly where: Partial<TodoAttributes>

  constructor(props: PaginatedParams<FindTodosQuery>) {
    super(props)
    this.where = {}
    if (props.where.text) this.where.text = props.where.text
    if (props.where.completed) this.where.completed = props.where.completed
  }
}
