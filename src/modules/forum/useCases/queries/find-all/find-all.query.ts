import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceResponse } from './find-all.service'
import { FindPostsParams } from '@src/modules/forum/repository/post.repository.port'
import { Order } from '@src/modules/forum/dtos/paginated-query.request.dto'
import { PostModelAttributes } from '@src/modules/forum/domain/post.types'
import { OrderBy } from '@src/shared/domain/repository.port'

export class FindPostsQuery extends PaginatedQueryBase implements FindPostsParams, IQuery<FindPostsServiceResponse> {
  declare response?: FindPostsServiceResponse
}
