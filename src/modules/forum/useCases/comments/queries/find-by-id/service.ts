import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { CommentFindByIdQuery } from './query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { PostEntity } from '@src/modules/forum/domain/entity/post/entity'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommentServiceBase } from '../../base.service'
import { CommentEntity } from '@src/modules/forum/domain/entity/comments/entity'

type Return = CommentEntity
export type CommentFindByIdServiceResponse = ResultWithError<CommentEntity>

@injectable()
@QueryHandler(CommentFindByIdQuery)
export class CommentFindByIdService extends CommentServiceBase<CommentFindByIdQuery, Return> {
  async executeImpl(query: CommentFindByIdQuery): Promise<Return> {
    const entity = await this.commentRepo.findByIdWithDetail(query.commentId, query.userId)
    if (!entity) throw new NotFoundException()

    return entity
  }
}
