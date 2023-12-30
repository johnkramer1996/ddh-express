import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UpdatePostServiceResponse as SettingsUserServiceResponse } from './update-user.service'
import fileUpload from 'express-fileupload'

export class UpdateUserCommand implements ICommand<SettingsUserServiceResponse> {
  declare response?: SettingsUserServiceResponse
  readonly authUserId: string
  readonly email?: string
  readonly password?: string
  readonly avatar?: fileUpload.UploadedFile | fileUpload.UploadedFile[]
  readonly firstName?: string
  readonly lastName?: string
  readonly deleteAvatar?: boolean

  constructor(props: UpdateUserCommand) {
    this.authUserId = props.authUserId
    this.email = props.email
    this.password = props.password
    this.avatar = props.avatar
    this.firstName = props.firstName
    this.lastName = props.lastName
    this.deleteAvatar = props.deleteAvatar
  }
}
