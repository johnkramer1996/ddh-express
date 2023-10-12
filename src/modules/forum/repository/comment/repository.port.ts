import { Options, Paginated, QueryParams, RepositoryPort } from '../../../../shared/domain/repository.port'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { AttributeStrategyPort, IncludeStrategyPort } from '@src/shared/domain/repository.port'
import { CommentFindAllQuery } from '../../useCases/comment/queries/find-all/query'

export interface FindCommentsParams extends QueryParams {
  slug: string
  userId?: string
}

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  findAllPaginatedDetail(params: FindCommentsParams): Promise<Paginated<CommentEntity>>
  findOneByIdWithNestedCommentsDetail(commentId: string, userId?: string): Promise<CommentEntity | null>
}
