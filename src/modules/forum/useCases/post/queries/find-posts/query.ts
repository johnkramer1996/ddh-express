import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceResponse } from './service'
import { FindPostsParams } from '@src/modules/forum/repository/post/repository.port'
import { PostStatus } from '@src/modules/forum/domain/entity/post/types'

export class FindPostsQuery extends PaginatedQueryBase implements FindPostsParams, IQuery<FindPostsServiceResponse> {
  declare response?: FindPostsServiceResponse
  readonly userId?: string
  readonly moderated?: boolean
  readonly status?: PostStatus

  constructor(props: PaginatedParams<FindPostsQuery>) {
    super(props)
    this.userId = props.userId
    this.moderated = props.moderated
    this.status = props.status
  }
}
