import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindBySlugQuery } from './find-by-slug.query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '../../../../../shared/core/cqs/query-handler'
import { PostService } from '../../service.base'
import { PostEntity } from '@src/modules/forum/domain/post.entity'

type Return = PostEntity
export type FindBySlugServiceResponse = ResultWithError<PostEntity>

@injectable()
@QueryHandler(FindBySlugQuery)
export class FindBySlugService extends PostService<FindBySlugQuery, Return> {
  async executeImpl(query: FindBySlugQuery): Promise<Return> {
    const post = await this.repository.findOneBySlug(query.slug)
    if (!post) throw new NotFoundException()

    return post
  }
}
