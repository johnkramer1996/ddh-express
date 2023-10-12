import { ResultWithError } from '@src/shared/core/result'
import { IncludeStrategyPort, Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { PostFindAllQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostEntity } from '@src/modules/forum/domain/entity/post/entity'
import { PostServiceBase } from '../../base.service'
import { PostUserIncludeStrategy } from '@src/modules/forum/repository/post/include-strategies/PostUserIncludeStrategy'
import { PostCurrentUserVotesIncludeStrategy } from '@src/modules/forum/repository/post/include-strategies/PostCurrentUserVotesIncludeStrategy'

type Return = Paginated<PostEntity>
export type FindPostsServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(PostFindAllQuery)
export class PostFindAllService extends PostServiceBase<PostFindAllQuery, Return> {
  async executeImpl(query: PostFindAllQuery): Promise<Return> {
    const entities = await this.postRepo.findAllPaginatedDetail(query)

    return entities
  }
}
