import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceByUserResponse } from './service'
import { FindPostsParams } from '@src/modules/forum/repository/post/repository.port'

export class FindPostsByAuthUserQuery extends PaginatedQueryBase implements FindPostsParams, IQuery<FindPostsServiceByUserResponse> {
  declare response?: FindPostsServiceByUserResponse
  readonly login: string

  constructor(props: PaginatedParams<FindPostsByAuthUserQuery>) {
    super(props)
    this.login = props.login
  }
}
