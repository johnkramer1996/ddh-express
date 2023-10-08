import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { CommentFindAllQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommentServiceBase } from '../../base.service'
import { CommentEntity } from '@src/modules/forum/domain/entity/comments/entity'

type Return = Paginated<CommentEntity>
export type CommentFindAllServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(CommentFindAllQuery)
export class CommentFindAllService extends CommentServiceBase<CommentFindAllQuery, Return> {
  async executeImpl(query: CommentFindAllQuery): Promise<Return> {
    const entities = await this.commentRepo.findAllByPostSlug(query)

    return entities
  }
}
