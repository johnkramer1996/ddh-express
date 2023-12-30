import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { CountByAuthUserResponse } from './service'
import { FindPostsParams } from '@src/modules/forum/repository/post/post.repository.port'
import { PostStatus } from '@src/modules/forum/domain/entity/post/post.types'

export class CountPostsByStatusQuery implements IQuery<CountByAuthUserResponse> {
  declare response?: CountByAuthUserResponse
  readonly authUserId: string

  constructor(props: PaginatedParams<CountPostsByStatusQuery>) {
    this.authUserId = props.authUserId
  }
}
