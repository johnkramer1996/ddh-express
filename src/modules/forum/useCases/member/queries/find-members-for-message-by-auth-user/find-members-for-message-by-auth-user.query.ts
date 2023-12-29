import { IQuery } from '@src/shared/core/cqs/query.interface'
import { FindMembersForMessageServiceByUserResponse } from './find-members-for-message-by-auth-user.service'

export class FindMembersForMessageByAuthUserQuery implements IQuery<FindMembersForMessageServiceByUserResponse> {
  declare response?: FindMembersForMessageServiceByUserResponse
  readonly authUserId: string

  constructor(props: FindMembersForMessageByAuthUserQuery) {
    this.authUserId = props.authUserId
  }
}
