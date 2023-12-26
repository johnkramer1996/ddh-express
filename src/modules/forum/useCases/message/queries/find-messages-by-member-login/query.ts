import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceByUserResponse } from './service'
import { FindMessagesParams } from '@src/modules/forum/repository/message/repository.port'

export class FindMessagesByLoginQuery extends PaginatedQueryBase implements FindMessagesParams, IQuery<FindPostsServiceByUserResponse> {
  declare response?: FindPostsServiceByUserResponse
  readonly authUserId: string
  readonly login: string

  constructor(props: PaginatedParams<FindMessagesByLoginQuery>) {
    super(props)
    this.authUserId = props.authUserId
    this.login = props.login
  }
}
