import { FindTodosParams } from '@src/modules/todo/repository/repository.port'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindPostsServiceResponse } from './find-all.service'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'

export class FindPostsQuery extends PaginatedQueryBase implements FindTodosParams, IQuery<FindPostsServiceResponse> {
  declare response?: FindPostsServiceResponse
  readonly where: Partial<UserModelAttributes>

  constructor(props: PaginatedParams<FindPostsQuery>) {
    super(props)
    this.where = {}
  }
}
