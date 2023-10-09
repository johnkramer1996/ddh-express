import { ICommand } from '@src/shared/core/cqs/command.interface'
import { DeleteUserServiceResponse } from './service'

export class DeleteUserCommand implements ICommand<DeleteUserServiceResponse> {
  declare response?: DeleteUserServiceResponse
  readonly deleteUserId: string
  readonly userId: string

  constructor(props: DeleteUserCommand) {
    this.deleteUserId = props.deleteUserId
    this.userId = props.userId
  }
}
