import { ICommand } from '@src/shared/core/cqs/command.interface'
import { BanMemberServiceResponse } from './ban-or-recover-member-by-login.service'

export class BanMemberCommand implements ICommand<BanMemberServiceResponse> {
  declare response?: BanMemberServiceResponse
  readonly action: 'ban' | 'recover'
  readonly authUserId: string
  readonly login: string

  constructor(props: BanMemberCommand) {
    this.action = props.action
    this.login = props.login
    this.authUserId = props.authUserId
  }
}
