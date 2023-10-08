import { Result, ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindUsersQuery } from './find-users.query'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { UserService } from '../../base.service'

type FindUsersServiceReturn = Paginated<UserEntity>
export type FindUsersServiceResponse = ResultWithError<FindUsersServiceReturn>

@injectable()
@QueryHandler(FindUsersQuery)
export class FindUsersService extends UserService<FindUsersQuery, FindUsersServiceReturn> {
  async executeImpl(query: FindUsersQuery): Promise<Paginated<UserEntity>> {
    const items = await this.commentRepo.findAllPaginated(query)

    return items
  }
}
