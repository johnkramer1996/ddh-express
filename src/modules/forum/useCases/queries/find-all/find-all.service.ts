import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindPostsQuery } from './find-all.query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceBase } from '../../service.base'
import { PostEntity } from '@src/modules/forum/domain/post.entity'

type Return = Paginated<PostEntity>
export type FindPostsServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindPostsQuery)
export class FindPostsService extends PostServiceBase<FindPostsQuery, Return> {
  async executeImpl(query: FindPostsQuery): Promise<Paginated<PostEntity>> {
    const items = await this.postRepo.findAllPaginated(query)

    return items
  }
}
