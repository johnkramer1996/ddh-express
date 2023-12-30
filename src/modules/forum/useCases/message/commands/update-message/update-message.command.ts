import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UpdateMessageServiceResponse } from './update-message.service'

export class UpdateMessageCommand implements ICommand<UpdateMessageServiceResponse> {
  declare response?: UpdateMessageServiceResponse
  readonly userId: string
  readonly messageId: string
  readonly message?: string
  readonly isRead?: boolean

  constructor(props: UpdateMessageCommand) {
    this.userId = props.userId
    this.messageId = props.messageId
    this.message = props.message
    this.isRead = props.isRead
  }
}
