import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceResponse } from './find-all.service'
import { FindPostsParams } from '@src/modules/forum/repository/repository.port'
import { PostModelAttributes } from '@src/modules/forum/domain/post.types'

export class FindPostsQuery extends PaginatedQueryBase implements FindPostsParams, IQuery<FindPostsServiceResponse> {
  declare response?: FindPostsServiceResponse
  readonly where: Partial<PostModelAttributes>

  constructor(props: PaginatedParams<FindPostsQuery>) {
    super(props)
    this.where = {}
  }
}
