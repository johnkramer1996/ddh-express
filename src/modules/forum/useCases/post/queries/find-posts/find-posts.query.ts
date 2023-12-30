import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceResponse } from './find-posts.service'
import { FindPostsParams } from '@src/modules/forum/repository/post/post.repository.port'
import { PostStatus } from '@src/modules/forum/domain/entity/post/post.types'
import { OrderBy } from '@src/shared/domain/repository.port'

export class FindPostsQuery extends PaginatedQueryBase implements FindPostsParams, IQuery<FindPostsServiceResponse> {
  declare response?: FindPostsServiceResponse
  readonly userId?: string
  readonly moderated?: boolean
  readonly status?: PostStatus
  readonly order?: OrderBy[]

  constructor(props: PaginatedParams<FindPostsQuery>) {
    super(props)
    this.userId = props.userId
    this.moderated = props.moderated
    this.status = props.status
    this.order = props.order && props.order.length ? props.order : [['createdAt', 'desc']]
  }
}
