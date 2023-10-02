import { ICommand } from '@src/shared/core/cqs/command.interface'
import { DeleteTodoServiceResponse } from './delete-todo.service'

export class DeleteTodoCommand implements ICommand<DeleteTodoServiceResponse> {
  declare response?: DeleteTodoServiceResponse
  readonly todoId: string

  constructor(props: DeleteTodoCommand) {
    this.todoId = props.todoId
  }
}
