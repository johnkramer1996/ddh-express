import { FindTodosParams } from '@src/modules/todo/repository/repository.port'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindUsersServiceResponse } from './find-users.service'
import { TodoModelAttributes } from '@src/modules/todo/domain/todo.types'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'
import { FindUsersParams } from '@src/modules/user/repository/repository.port'

export class FindUsersQuery extends PaginatedQueryBase implements FindUsersParams, IQuery<FindUsersServiceResponse> {
  declare response?: FindUsersServiceResponse
  // readonly where: Partial<UserModelAttributes>

  constructor(props: PaginatedParams<FindUsersQuery>) {
    super(props)
    // this.where = {}
    // if (props.where.text) this.where.email = props.where.email
  }
}
