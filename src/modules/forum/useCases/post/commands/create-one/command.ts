import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateOneServiceResponse } from './service'
import { PostType } from '@src/modules/forum/domain/entity/post/types'

export class CreateOneCommand implements ICommand<CreateOneServiceResponse> {
  declare response?: CreateOneServiceResponse
  readonly userId: string
  readonly type: PostType
  readonly title: string
  readonly text: string
  readonly link: string

  constructor(props: CreateOneCommand) {
    this.userId = props.userId
    this.title = props.title
    this.text = props.text
    this.link = props.link
    this.type = props.type
  }
}
