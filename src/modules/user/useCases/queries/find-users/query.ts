import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindUsersServiceResponse } from './service'
import { FindUsersParams } from '@src/modules/user/repository/user.repository.port'

export class FindUsersQuery extends PaginatedQueryBase implements FindUsersParams, IQuery<FindUsersServiceResponse> {
  declare response?: FindUsersServiceResponse
}
