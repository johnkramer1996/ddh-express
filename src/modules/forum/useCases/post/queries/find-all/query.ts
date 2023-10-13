import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceResponse } from './service'
import { FindPostsParams } from '@src/modules/forum/repository/post/repository.port'

export class FindPostsQuery extends PaginatedQueryBase implements FindPostsParams, IQuery<FindPostsServiceResponse> {
  declare response?: FindPostsServiceResponse
  readonly authMemberId?: string

  constructor(props: PaginatedParams<FindPostsQuery>) {
    super(props)
    this.authMemberId = props.authMemberId
  }
}
