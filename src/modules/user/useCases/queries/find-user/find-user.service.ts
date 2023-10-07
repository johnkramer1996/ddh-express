import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindUserQuery } from './find-user.query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '../../../../../shared/core/cqs/query-handler'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { UserService } from '../../models/user.service.base'

type FindUsersServiceReturn = UserEntity
export type FindUserServiceResponse = ResultWithError<FindUsersServiceReturn>

@injectable()
@QueryHandler(FindUserQuery)
export class FindUserService extends UserService<FindUserQuery, FindUsersServiceReturn> {
  protected async executeImpl(query: FindUserQuery): Promise<FindUsersServiceReturn> {
    const todo = await this.commentRepo.findOneById(query.userId)
    if (!todo) throw new NotFoundException()

    return todo
  }
}
