import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateUserServiceResponse } from './service'

export class CreateUserCommand implements ICommand<CreateUserServiceResponse> {
  declare response?: CreateUserServiceResponse
  readonly login: string
  readonly email: string
  readonly password: string

  constructor(props: CreateUserCommand) {
    this.login = props.login
    this.email = props.email
    this.password = props.password
  }
}
