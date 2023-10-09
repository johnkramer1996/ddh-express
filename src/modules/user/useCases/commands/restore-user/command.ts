import { ICommand } from '@src/shared/core/cqs/command.interface'
import { RecoverUserServiceResponse } from './service'

export class RecoverUserCommand implements ICommand<RecoverUserServiceResponse> {
  declare response?: RecoverUserServiceResponse
  readonly userId: string

  constructor(props: RecoverUserCommand) {
    this.userId = props.userId
  }
}
