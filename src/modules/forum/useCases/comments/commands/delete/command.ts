import { ICommand } from '@src/shared/core/cqs/command.interface'
import { DeleteCommentServiceResponse } from './service'

export class CommentDeleteOneCommand implements ICommand<DeleteCommentServiceResponse> {
  declare response?: DeleteCommentServiceResponse
  readonly commentId: string

  constructor(props: CommentDeleteOneCommand) {
    this.commentId = props.commentId
  }
}
