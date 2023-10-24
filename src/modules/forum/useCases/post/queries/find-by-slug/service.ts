import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindBySlugQuery } from './query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceBase } from '../../base.service'
import { PostResponseDto } from '@src/modules/forum/dtos/post/response.dto'

//TODO
// POST DETAIL  ValueObject
type Return = PostResponseDto
export type FindBySlugServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindBySlugQuery)
export class FindBySlugService extends PostServiceBase<FindBySlugQuery, Return> {
  async executeImpl(query: FindBySlugQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserIdIfExists(query.userId)

    const post = await this.postRepo.findBySlugQuery(query.slug, authMember?.id)
    if (!post) throw new NotFoundException()

    return post
  }
}
