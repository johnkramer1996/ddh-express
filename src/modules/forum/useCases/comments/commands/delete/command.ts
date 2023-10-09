import { ICommand } from '@src/shared/core/cqs/command.interface'
import { DeleteCommentServiceResponse } from './service'

export class CommentDeleteOneCommand implements ICommand<DeleteCommentServiceResponse> {
  declare response?: DeleteCommentServiceResponse
  readonly userId: string
  readonly slug: string
  readonly commentId: string

  constructor(props: CommentDeleteOneCommand) {
    this.userId = props.userId
    this.slug = props.slug
    this.commentId = props.commentId
  }
}
