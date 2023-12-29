import { ICommand } from '@src/shared/core/cqs/command.interface'
import { DeletePostServiceResponse as DeletePostServiceResponse } from './delete-post.service'

export class DeletePostCommand implements ICommand<DeletePostServiceResponse> {
  declare response?: DeletePostServiceResponse
  readonly authUserId: string
  readonly slug: string

  constructor(props: DeletePostCommand) {
    this.authUserId = props.authUserId
    this.slug = props.slug
  }
}
