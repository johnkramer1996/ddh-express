import { QueryParams, RepositoryPort } from '../../../../shared/domain/repository.port'
import { PostEntity } from '../../domain/entity/post/entity'

export interface FindPostsParams extends QueryParams {}

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {
  findBySlug(slug: string): Promise<PostEntity | null>
  findBySlugDetail(slug: string, userId?: string): Promise<PostEntity | null>
}
