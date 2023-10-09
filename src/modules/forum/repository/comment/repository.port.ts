import { ObjectLiteral } from '@src/shared/types/object-literal.type'
import { Paginated, QueryParams, RepositoryPort } from '../../../../shared/domain/repository.port'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { PostEntity } from '../../domain/entity/post/entity'

export interface FindCommentsParams extends QueryParams {
  slug: string
  userId?: string
}

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  findAllByPostSlug(slug: FindCommentsParams): Promise<Paginated<CommentEntity>>
  findByIdWithDetail(id: string, userId?: string): Promise<CommentEntity | null>
}
