import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindChildrenCommentByIdQuery } from './find-children-comment-by-id.query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommentServiceQueryBase } from '../../comment.base.service'
import { CommentQuery } from '@src/modules/forum/domain/entity/comment/comment.query'

type Return = CommentQuery[]
export type FindChildrenCommentByIdServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindChildrenCommentByIdQuery)
export class FindChildrenCommentByIdService extends CommentServiceQueryBase<FindChildrenCommentByIdQuery, Return> {
  async executeImpl(query: FindChildrenCommentByIdQuery): Promise<Return> {
    const authMember = await this.memberRepository.findOneByUserIdIfExists(query.userId)

    const entity = await this.commentRepository.findOneByIdAndAuthUserId(query.commentId, authMember?.id)
    if (!entity) throw new NotFoundException()

    const children = await this.commentRepository.findChildrenComment(entity, authMember?.id)

    return children
  }
}
