import { IQuery } from '@src/shared/core/cqs/query.interface'
import { PaginatedQueryBase } from '@src/shared/domain/query.base'
import { FindMembersServiceResponse } from './find-members.service'
import { FindUsersParams } from '@src/modules/user/repository/user.repository.port'

export class FindMembersQuery extends PaginatedQueryBase implements FindUsersParams, IQuery<FindMembersServiceResponse> {
  declare response?: FindMembersServiceResponse
}
