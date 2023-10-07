import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceResponse } from './find-all.service'
import { FindPostsParams } from '@src/modules/forum/repository/post/post.repository.port'

export class FindPostsQuery extends PaginatedQueryBase implements FindPostsParams, IQuery<FindPostsServiceResponse> {
  declare response?: FindPostsServiceResponse
}
