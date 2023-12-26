import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreatePostServiceResponse } from './service'
import { PostType } from '@src/modules/forum/domain/entity/post/types'
import fileUpload from 'express-fileupload'

export class CreatePostCommand implements ICommand<CreatePostServiceResponse> {
  declare response?: CreatePostServiceResponse
  readonly authUserId: string
  readonly type: PostType
  readonly image: fileUpload.UploadedFile | fileUpload.UploadedFile[]
  readonly title: string
  readonly text: string
  readonly link: string

  constructor(props: CreatePostCommand) {
    this.authUserId = props.authUserId
    this.type = props.type
    this.image = props.image
    this.title = props.title
    this.text = props.text
    this.link = props.link
  }
}
