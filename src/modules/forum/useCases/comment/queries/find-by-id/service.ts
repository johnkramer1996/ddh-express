import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { CommentFindByIdQuery } from './query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommentServiceBase, CommentServiceQueryBase } from '../../base.service'
import { CommentEntity } from '@src/modules/forum/domain/entity/comments/entity'
import { CommentQuery } from '@src/modules/forum/domain/entity/comments/query'

type Return = CommentQuery
export type CommentFindByIdServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(CommentFindByIdQuery)
export class CommentFindByIdService extends CommentServiceQueryBase<CommentFindByIdQuery, Return> {
  async executeImpl(query: CommentFindByIdQuery): Promise<Return> {
    const authMember = await this.memberRepository.findOneByUserIdIfExists(query.userId)

    const entity = await this.commentRepository.findOneByIdWithNestedComments(query.commentId, authMember?.id)
    if (!entity) throw new NotFoundException()

    return entity
  }
}
