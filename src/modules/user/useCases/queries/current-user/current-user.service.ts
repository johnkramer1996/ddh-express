import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { CurrentUserQuery } from './current-user.query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { UserService } from '../../models/user.service.base'

type Return = UserEntity
export type CurrentUserServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(CurrentUserQuery)
export class CurrentUserService extends UserService<CurrentUserQuery, Return> {
  async executeImpl(query: CurrentUserQuery): Promise<Return> {
    const user = await this.postRepo.findOneById(query.id)
    if (!user) throw new NotFoundException()

    return user
  }
}
