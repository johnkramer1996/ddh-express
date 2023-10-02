import { IQuery } from '../../../../../shared/core/cqs/query.interface'
import { FindTodoServiceResponse } from './find-todo.service'

export class FindTodoQuery implements IQuery<FindTodoServiceResponse> {
  declare response?: FindTodoServiceResponse
  readonly todoId: string

  constructor(props: FindTodoQuery) {
    this.todoId = props.todoId
  }
}
