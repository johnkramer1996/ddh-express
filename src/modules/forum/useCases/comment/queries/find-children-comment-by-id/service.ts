import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindChildrenCommentByIdQuery } from './query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommentServiceQueryBase } from '../../base.service'
import { CommentQuery } from '@src/modules/forum/domain/entity/comments/query'

type Return = CommentQuery[]
export type FindChildrenCommentByIdServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindChildrenCommentByIdQuery)
export class FindChildrenCommentByIdService extends CommentServiceQueryBase<FindChildrenCommentByIdQuery, Return> {
  async executeImpl(query: FindChildrenCommentByIdQuery): Promise<Return> {
    const authMember = await this.memberRepository.findOneByUserIdIfExists(query.userId)

    const entity = await this.commentRepository.findOneByIdWithNestedComments2(query.commentId, authMember?.id)
    if (!entity) throw new NotFoundException()

    console.log(entity)

    return entity
  }
}
