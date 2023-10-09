import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UserCreateServiceResponse } from './service'

export class UserCreateCommand implements ICommand<UserCreateServiceResponse> {
  declare response?: UserCreateServiceResponse
  readonly email: string
  readonly password: string

  constructor(props: UserCreateCommand) {
    this.email = props.email
    this.password = props.password
  }
}
