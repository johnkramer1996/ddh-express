import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CommentCreateServiceResponse } from './service'

export class CommentCreateCommand implements ICommand<CommentCreateServiceResponse> {
  declare response?: CommentCreateServiceResponse
  readonly slug: string
  readonly userId: string
  readonly text: string
  readonly parentId?: string

  constructor(props: CommentCreateCommand) {
    this.slug = props.slug
    this.userId = props.userId
    this.text = props.text
    this.parentId = props.parentId
  }
}
