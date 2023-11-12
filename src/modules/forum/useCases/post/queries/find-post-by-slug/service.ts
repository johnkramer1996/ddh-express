import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindPostBySlugQuery } from './query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceBase, PostServiceQueryBase } from '../../base.service'
import { PostResponseDto } from '@src/modules/forum/dtos/post/response.dto'
import { ServiceBase } from '@src/shared/core/service.base'

//TODO
// POST DETAIL  ValueObject
type Return = PostResponseDto
export type FindPostBySlugServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindPostBySlugQuery)
export class FindPostBySlugService extends PostServiceQueryBase<FindPostBySlugQuery, Return> {
  async executeImpl(query: FindPostBySlugQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserIdIfExists(query.userId)

    const post = await this.postRepo.findBySlugQuery(query.slug, authMember?.id)
    if (!post) throw new NotFoundException()

    return post
  }
}
