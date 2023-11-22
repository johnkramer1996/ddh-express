import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { CurrentUserQuery } from './query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { UserServiceBase, UserServiceQueryBase } from '../../base.service'
import { UserQuery } from '@src/modules/user/domain/user.query'

type Return = UserQuery
export type CurrentUserServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(CurrentUserQuery)
export class CurrentUserService extends UserServiceQueryBase<CurrentUserQuery, Return> {
  async executeImpl(query: CurrentUserQuery): Promise<Return> {
    const user = await this.userRepo.findOneById(query.userId)
    if (!user) throw new NotFoundException()

    return user
  }
}
