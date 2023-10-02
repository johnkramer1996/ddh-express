import { ICommand } from '@src/shared/core/cqs/command.interface'
import { DeleteUserServiceResponse } from './delete-user.service'

export class DeleteUserCommand implements ICommand<DeleteUserServiceResponse> {
  declare response?: DeleteUserServiceResponse
  readonly todoId: string

  constructor(props: DeleteUserCommand) {
    this.todoId = props.todoId
  }
}
