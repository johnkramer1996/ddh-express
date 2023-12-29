import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreatePostServiceResponse } from './create-post.service'
import { PostStatus } from '@src/modules/forum/domain/entity/post/post.types'
import fileUpload from 'express-fileupload'

export class CreatePostCommand implements ICommand<CreatePostServiceResponse> {
  declare response?: CreatePostServiceResponse
  readonly authUserId: string
  readonly image: fileUpload.UploadedFile | fileUpload.UploadedFile[]
  readonly title: string
  readonly text: string
  readonly status: PostStatus

  constructor(props: CreatePostCommand) {
    this.authUserId = props.authUserId
    this.image = props.image
    this.title = props.title
    this.text = props.text
    this.status = props.status
  }
}
