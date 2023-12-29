import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindCommentByIdQuery } from './find-comment-by-id.query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommentServiceQueryBase } from '../../comment.base.service'
import { CommentQuery } from '@src/modules/forum/domain/entity/comment/comment.query'

type Return = CommentQuery
export type FindCommentByIdServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindCommentByIdQuery)
export class FindCommentByIdService extends CommentServiceQueryBase<FindCommentByIdQuery, Return> {
  async executeImpl(query: FindCommentByIdQuery): Promise<Return> {
    const authMember = await this.memberRepository.findOneByUserIdIfExists(query.userId)

    const entity = await this.commentRepository.findOneByIdAndAuthUserId(query.commentId, authMember?.id)
    if (!entity) throw new NotFoundException()

    return entity
  }
}
