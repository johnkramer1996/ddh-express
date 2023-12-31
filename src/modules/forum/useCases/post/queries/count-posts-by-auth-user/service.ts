import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceQueryBase } from '../../post.base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CountPostsByStatusQuery } from './query'
import { CountPostsByAuthMemberId } from '@src/modules/forum/repository/post/post.repository.port'

type Return = CountPostsByAuthMemberId
export type CountByAuthUserResponse = ResultWithError<Return>

@injectable()
@QueryHandler(CountPostsByStatusQuery)
export class CountPostsByAuthUserService extends PostServiceQueryBase<CountPostsByStatusQuery, Return> {
  async executeImpl(query: CountPostsByStatusQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserId(query.authUserId)
    if (!authMember) throw new NotFoundException()

    const result = await this.postRepo.countByAuthMemberId(authMember.id)

    return result
  }
}
