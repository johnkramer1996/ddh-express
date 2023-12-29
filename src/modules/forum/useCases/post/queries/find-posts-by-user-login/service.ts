import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindPostsByLoginQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceQueryBase } from '../../base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { PostQuery } from '@src/modules/forum/domain/entity/post/post.query'

type Return = Paginated<PostQuery>
export type FindPostsServiceByUserResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindPostsByLoginQuery)
export class FindPostsByLoginService extends PostServiceQueryBase<FindPostsByLoginQuery, Return> {
  async executeImpl(query: FindPostsByLoginQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserIdIfExists(query.userId)

    const member = await this.memberRepo.findOneByLogin(query.login)
    if (!member) throw new NotFoundException()

    const posts = await this.postRepo.findAllPaginatedWithPostVotesByAuthMemberId({ ...query, memberId: member.id, status: 'publish' }, authMember?.id)

    return posts
  }
}
