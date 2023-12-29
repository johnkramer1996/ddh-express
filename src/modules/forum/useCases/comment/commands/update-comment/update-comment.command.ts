import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UpdateCommentServiceResponse } from './update-comment.service'

export class UpdateCommentCommand implements ICommand<UpdateCommentServiceResponse> {
  declare response?: UpdateCommentServiceResponse
  readonly userId: string
  readonly slug: string
  readonly commentId: string
  readonly text?: string

  constructor(props: UpdateCommentCommand) {
    this.userId = props.userId
    this.slug = props.slug
    this.commentId = props.commentId
    this.text = props.text
  }
}
