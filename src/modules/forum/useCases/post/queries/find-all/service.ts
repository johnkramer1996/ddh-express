import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { PostFindAllQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostEntity } from '@src/modules/forum/domain/entity/post/entity'
import { PostServiceBase } from '../../base.service'

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
