import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceByUserResponse } from './service'
import { FindPostsParams } from '@src/modules/forum/repository/post/repository.port'

export class FindPostsByLoginQuery extends PaginatedQueryBase implements FindPostsParams, IQuery<FindPostsServiceByUserResponse> {
  declare response?: FindPostsServiceByUserResponse
  readonly login: string
  readonly userId?: string

  constructor(props: PaginatedParams<FindPostsByLoginQuery>) {
    super(props)
    this.login = props.login
    this.userId = props.userId
  }
}
