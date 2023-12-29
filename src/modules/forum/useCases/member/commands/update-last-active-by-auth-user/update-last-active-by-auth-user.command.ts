import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UpdateLastActiveMemberServiceResponse } from './update-last-active-by-auth-user.service'

export class UpdateLastActiveMemberCommand implements ICommand<UpdateLastActiveMemberServiceResponse> {
  declare response?: UpdateLastActiveMemberServiceResponse
  readonly authUserId: string

  constructor(props: UpdateLastActiveMemberCommand) {
    this.authUserId = props.authUserId
  }
}
