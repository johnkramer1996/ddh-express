import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateMessageServiceResponse } from './service'

export class CreateMessageCommand implements ICommand<CreateMessageServiceResponse> {
  declare response?: CreateMessageServiceResponse
  readonly userId: string
  readonly toMemberId: string
  readonly message: string

  constructor(props: CreateMessageCommand) {
    this.userId = props.userId
    this.toMemberId = props.toMemberId
    this.message = props.message
  }
}
