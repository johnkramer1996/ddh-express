import { FindTodosParams } from '@src/modules/todo/repository/repository.port'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { TodoAttributes } from '@src/shared/infra/database/sequelize/models/todo.model'

export class FindTodoQuery {
  readonly todoId: string

  constructor(props: FindTodoQuery) {
    this.todoId = props.todoId
  }
}
