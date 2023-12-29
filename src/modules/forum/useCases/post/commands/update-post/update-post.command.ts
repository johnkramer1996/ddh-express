import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UpdatePostServiceResponse as UpdatePostServiceResponse } from './update-post.service'
import fileUpload from 'express-fileupload'
import { PostStatus } from '@src/modules/forum/domain/entity/post/post.types'

export class UpdatePostCommand implements ICommand<UpdatePostServiceResponse> {
  declare response?: UpdatePostServiceResponse
  readonly authUserId: string
  readonly slug: string
  readonly status?: PostStatus
  readonly image?: fileUpload.UploadedFile | fileUpload.UploadedFile[]
  readonly title?: string
  readonly text?: string

  constructor(props: UpdatePostCommand) {
    this.authUserId = props.authUserId
    this.slug = props.slug
    this.status = props.status
    this.image = props.image
    this.title = props.title
    this.text = props.text
  }
}
