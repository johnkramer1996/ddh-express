import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindPostBySlugQuery } from './find-post-by-slug.query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceQueryBase } from '../../post.base.service'
import { PostQuery } from '@src/modules/forum/domain/entity/post/post.query'

type Return = PostQuery
export type FindPostBySlugServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindPostBySlugQuery)
export class FindPostBySlugService extends PostServiceQueryBase<FindPostBySlugQuery, Return> {
  async executeImpl(query: FindPostBySlugQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserIdIfExists(query.userId)

    const post = await this.postRepo.findBySlug(query.slug, authMember?.id)
    if (!post) throw new NotFoundException()

    return post
  }
}
