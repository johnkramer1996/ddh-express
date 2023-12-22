import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateOneServiceResponse } from './service'
import { PostType } from '@src/modules/forum/domain/entity/post/types'
import fileUpload from 'express-fileupload'

export class CreateOneCommand implements ICommand<CreateOneServiceResponse> {
  declare response?: CreateOneServiceResponse
  readonly userId: string
  readonly type: PostType
  readonly image: fileUpload.UploadedFile | fileUpload.UploadedFile[]
  readonly title: string
  readonly text: string
  readonly link: string

  constructor(props: CreateOneCommand) {
    this.userId = props.userId
    this.type = props.type
    this.image = props.image
    this.title = props.title
    this.text = props.text
    this.link = props.link
  }
}
