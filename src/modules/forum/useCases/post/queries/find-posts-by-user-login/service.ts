import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindPostsByLoginQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceBase, PostServiceQueryBase } from '../../base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { PostQuery } from '@src/modules/forum/domain/entity/post/query'

type Return = Paginated<PostQuery>
export type FindPostsServiceByUserResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindPostsByLoginQuery)
export class FindPostsByLoginService extends PostServiceQueryBase<FindPostsByLoginQuery, Return> {
  async executeImpl(query: FindPostsByLoginQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserIdIfExists(query.userId)

    const member = await this.memberRepo.findOneByLogin(query.login)
    if (!member) throw new NotFoundException()

    const posts = await this.postRepo.findAllPaginatedByMemberId(query, member.id, authMember?.id)

    return posts
  }
}
