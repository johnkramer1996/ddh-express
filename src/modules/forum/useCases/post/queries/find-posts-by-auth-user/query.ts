import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceByUserResponse } from './service'
import { FindPostsParams } from '@src/modules/forum/repository/post/post.repository.port'
import { PostStatus } from '@src/modules/forum/domain/entity/post/post.types'

export class FindPostsByAuthUserQuery extends PaginatedQueryBase implements FindPostsParams, IQuery<FindPostsServiceByUserResponse> {
  declare response?: FindPostsServiceByUserResponse
  readonly authUserId: string
  readonly status?: PostStatus
  readonly memberId?: string

  constructor(props: PaginatedParams<FindPostsByAuthUserQuery>) {
    super(props)
    this.authUserId = props.authUserId
    this.status = props.status
    this.memberId = props.memberId
  }
}
