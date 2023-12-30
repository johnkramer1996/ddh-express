import { Result, ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindUsersQuery } from './find-users.query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { UserServiceQueryBase } from '../../user.base.service'
import { UserQuery } from '@src/modules/user/domain/user.query'

type FindUsersServiceReturn = Paginated<UserQuery>
export type FindUsersServiceResponse = ResultWithError<FindUsersServiceReturn>

@injectable()
@QueryHandler(FindUsersQuery)
export class FindUsersService extends UserServiceQueryBase<FindUsersQuery, FindUsersServiceReturn> {
  async executeImpl(query: FindUsersQuery): Promise<FindUsersServiceReturn> {
    const entities = await this.userRepo.findAllPaginated(query, { distinct: false })

    return entities
  }
}
