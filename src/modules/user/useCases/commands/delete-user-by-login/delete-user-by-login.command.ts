import { ICommand } from '@src/shared/core/cqs/command.interface'
import { DeleteUserServiceResponse } from './delete-user-by-login.service'

export class DeleteUserCommand implements ICommand<DeleteUserServiceResponse> {
  declare response?: DeleteUserServiceResponse
  readonly userId: string
  readonly authUserId: string

  constructor(props: DeleteUserCommand) {
    this.userId = props.userId
    this.authUserId = props.authUserId
  }
}
