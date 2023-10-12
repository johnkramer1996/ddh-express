import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceResponse } from './service'
import { FindPostsParams } from '@src/modules/forum/repository/post/repository.port'

export class PostFindAllQuery extends PaginatedQueryBase implements FindPostsParams, IQuery<FindPostsServiceResponse> {
  declare response?: FindPostsServiceResponse
  readonly userId?: string

  constructor(props: PaginatedParams<PostFindAllQuery>) {
    super(props)
    this.userId = props.userId
  }
}
