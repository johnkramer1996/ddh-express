import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CommentUpdateServiceResponse } from './service'

export class CommentUpdateCommand implements ICommand<CommentUpdateServiceResponse> {
  declare response?: CommentUpdateServiceResponse
  readonly userId: string
  readonly slug: string
  readonly commentId: string
  readonly text?: string

  constructor(props: CommentUpdateCommand) {
    this.userId = props.userId
    this.slug = props.slug
    this.commentId = props.commentId
    this.text = props.text
  }
}
