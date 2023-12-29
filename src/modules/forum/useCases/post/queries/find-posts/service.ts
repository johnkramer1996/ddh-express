import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindPostsQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceQueryBase } from '../../base.service'
import { PostQuery } from '@src/modules/forum/domain/entity/post/post.query'

type Return = Paginated<PostQuery>
export type FindPostsServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindPostsQuery)
export class FindPostsService extends PostServiceQueryBase<FindPostsQuery, Return> {
  async executeImpl(query: FindPostsQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserIdIfExists(query.userId)

    const posts = await this.postRepo.findAllPaginatedWithPostVotesByAuthMemberId({ ...query, status: 'publish' }, authMember?.id)

    return posts
  }
}
