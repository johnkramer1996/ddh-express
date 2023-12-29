import { ICommand } from '@src/shared/core/cqs/command.interface'
import { AddRoleToMemberServiceResponse } from './attach-or-detach-role-to-member.service'
import { MemberRole } from '@src/modules/forum/domain/entity/member/member.types'

export class AddRoleToMemberCommand implements ICommand<AddRoleToMemberServiceResponse> {
  declare response?: AddRoleToMemberServiceResponse
  readonly action: 'attachRole' | 'detachRole'
  readonly authUserId: string
  readonly login: string
  readonly role: MemberRole

  constructor(props: AddRoleToMemberCommand) {
    this.action = props.action
    this.authUserId = props.authUserId
    this.login = props.login
    this.role = props.role
  }
}
