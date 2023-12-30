import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindUserByLoginQuery } from './find-user-by-login.query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '../../../../../shared/core/cqs/query-handler'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { UserServiceBase, UserServiceQueryBase } from '../../user.base.service'
import { UserQuery } from '@src/modules/user/domain/user.query'

type FindUserByLoginServiceReturn = UserQuery
export type FindUserByLoginServiceResponse = ResultWithError<FindUserByLoginServiceReturn>

@injectable()
@QueryHandler(FindUserByLoginQuery)
export class FindUserByIdService extends UserServiceQueryBase<FindUserByLoginQuery, FindUserByLoginServiceReturn> {
  protected async executeImpl(query: FindUserByLoginQuery): Promise<FindUserByLoginServiceReturn> {
    const entity = await this.userRepo.findOneByLogin(query.login)
    if (!entity) throw new NotFoundException()

    return entity
  }
}
