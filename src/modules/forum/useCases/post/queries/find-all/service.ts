import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindPostsQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceBase } from '../../base.service'
import { PostResponseDto } from '@src/modules/forum/dtos/post/response.dto'

type Return = Paginated<PostResponseDto>
export type FindPostsServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindPostsQuery)
export class FindPostsService extends PostServiceBase<FindPostsQuery, Return> {
  async executeImpl(query: FindPostsQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserIdIfExists(query.userId)

    const posts = await this.postRepo.findAllPaginatedQuery(query, authMember?.id)

    return posts
  }
}
