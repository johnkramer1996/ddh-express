import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindBySlugQuery } from './find-by-slug.query'
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
    const post = await this.commentRepo.findOneBySlug(query.slug, query.userId)
    if (!post) throw new NotFoundException()

    return post
  }
}
