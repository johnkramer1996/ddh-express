import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateCommentServiceResponse } from './service'

export class CreateCommentCommand implements ICommand<CreateCommentServiceResponse> {
  declare response?: CreateCommentServiceResponse
  readonly slug: string
  readonly userId: string
  readonly text: string
  readonly parentId?: string

  constructor(props: CreateCommentCommand) {
    this.slug = props.slug
    this.userId = props.userId
    this.text = props.text
    this.parentId = props.parentId
  }
}
