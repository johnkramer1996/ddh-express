import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UpdatePostServiceResponse as UpdatePostServiceResponse } from './service'
import fileUpload from 'express-fileupload'

export class UpdatePostCommand implements ICommand<UpdatePostServiceResponse> {
  declare response?: UpdatePostServiceResponse
  readonly authUserId: string
  readonly slug: string
  readonly image?: fileUpload.UploadedFile | fileUpload.UploadedFile[]
  readonly title?: string
  readonly text?: string

  constructor(props: UpdatePostCommand) {
    this.authUserId = props.authUserId
    this.slug = props.slug
    this.image = props.image
    this.title = props.title
    this.text = props.text
  }
}
