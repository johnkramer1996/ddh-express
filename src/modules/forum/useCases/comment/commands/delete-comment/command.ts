import { ICommand } from '@src/shared/core/cqs/command.interface'
import { DeleteCommentByIdServiceResponse } from './service'

export class DeleteCommentByIdCommand implements ICommand<DeleteCommentByIdServiceResponse> {
  declare response?: DeleteCommentByIdServiceResponse
  readonly authUserId: string
  readonly slug: string
  readonly commentId: string

  constructor(props: DeleteCommentByIdCommand) {
    this.authUserId = props.authUserId
    this.slug = props.slug
    this.commentId = props.commentId
  }
}
