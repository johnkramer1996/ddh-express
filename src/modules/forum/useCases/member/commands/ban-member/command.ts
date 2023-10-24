import { ICommand } from '@src/shared/core/cqs/command.interface'
import { BanMemberServiceResponse } from './service'

export class BanMemberCommand implements ICommand<BanMemberServiceResponse> {
  declare response?: BanMemberServiceResponse
  readonly login: string
  readonly authUserId: string

  constructor(props: BanMemberCommand) {
    this.login = props.login
    this.authUserId = props.authUserId
  }
}
