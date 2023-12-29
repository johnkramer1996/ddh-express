import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindCommentsQuery } from './find-comments.query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommentServiceQueryBase } from '../../comment.base.service'
import { CommentQuery } from '@src/modules/forum/domain/entity/comment/comment.query'

type Return = Paginated<CommentQuery>
export type CommentFindAllServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindCommentsQuery)
export class FindCommentsQueryHandler extends CommentServiceQueryBase<FindCommentsQuery, Return> {
  async executeImpl(query: FindCommentsQuery): Promise<Return> {
    const authMember = await this.memberRepository.findOneByUserIdIfExists(query.userId)

    const paginated = await this.commentRepository.findAllPaginatedBySlug(query, query.slug, authMember?.id)

    return paginated
  }
}
