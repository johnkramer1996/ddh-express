import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindBySlugQuery } from './query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { PostEntity } from '@src/modules/forum/domain/entity/post/entity'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceBase } from '../../base.service'

type Return = PostEntity
export type FindBySlugServiceResponse = ResultWithError<PostEntity>

@injectable()
@QueryHandler(FindBySlugQuery)
export class FindBySlugService extends PostServiceBase<FindBySlugQuery, Return> {
  async executeImpl(query: FindBySlugQuery): Promise<Return> {
    const entity = await this.postRepo.findBySlugDetail(query.slug, query.userId)
    if (!entity) throw new NotFoundException()

    return entity
  }
}
