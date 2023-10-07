import { Paginated, QueryParams, RepositoryPort } from '../../../../shared/domain/repository.port'
import { CommentEntity } from '../../domain/entity/comments/entity'

export interface FindCommentsParams extends QueryParams {
  slug: string
}

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  findAllByPostSlug(slug: FindCommentsParams): Promise<Paginated<CommentEntity>>
}
