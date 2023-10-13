import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindUserByLoginQuery } from './query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '../../../../../shared/core/cqs/query-handler'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { UserService } from '../../base.service'

type FindUserByLoginServiceReturn = UserEntity
export type FindUserByLoginServiceResponse = ResultWithError<FindUserByLoginServiceReturn>

@injectable()
@QueryHandler(FindUserByLoginQuery)
export class FindUserByIdService extends UserService<FindUserByLoginQuery, FindUserByLoginServiceReturn> {
  protected async executeImpl(query: FindUserByLoginQuery): Promise<FindUserByLoginServiceReturn> {
    const entity = await this.userRepo.findOneByLogin(query.login)
    if (!entity) throw new NotFoundException()

    return entity
  }
}
