import { ICommand } from '@src/shared/core/cqs/command.interface'
import { LoginServiceResponse } from './service'

export class LoginCommand implements ICommand<LoginServiceResponse> {
  declare response?: LoginServiceResponse
  readonly email: string
  readonly password: string

  constructor(props: LoginCommand) {
    this.email = props.email
    this.password = props.password
  }
}
