import { InferAttributes, WhereOptions } from 'sequelize'
import { PaginatedParams, PaginatedQueryBase } from '../../../../../shared/domain/query.base'
import TodoModel, { TodoAttributes } from '../../../../../shared/infra/database/sequelize/models/todo.model'
import { FindTodosParams } from '../../../repository/repository.port'

export class FindTodosQuery extends PaginatedQueryBase implements FindTodosParams {
  readonly where: Partial<TodoAttributes>

  constructor(props: PaginatedParams<FindTodosQuery>) {
    super(props)
    this.where = {}
    if (props.where.text) this.where.text = props.where.text
    if (props.where.completed) this.where.completed = props.where.completed
  }
}
