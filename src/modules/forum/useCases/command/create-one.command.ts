import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateOneServiceResponse as CreateOneServiceResponse } from './create-one.service'
import { PostType } from '../../domain/post.types'

export class CreateOneCommand implements ICommand<CreateOneServiceResponse> {
  declare response?: CreateOneServiceResponse
  readonly type: PostType
  readonly title: string
  readonly text: string
  readonly link: string
  readonly userId: string

  constructor(props: CreateOneCommand) {
    this.title = props.title
    this.text = props.text
    this.link = props.link
    this.type = props.type
    this.userId = props.userId
  }
}
