import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateUserServiceResponse } from './create-user.service'

export class CreateUserCommand implements ICommand<CreateUserServiceResponse> {
  declare response?: CreateUserServiceResponse
  readonly email: string
  readonly password: string

  constructor(props: CreateUserCommand) {
    this.email = props.email
    this.password = props.password
  }
}
