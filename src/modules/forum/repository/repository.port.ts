import { QueryParams, RepositoryPort } from '../../../shared/domain/repository.port'
import { PostEntity } from '../domain/post.entity'

export interface FindPostsParams extends QueryParams {
  // readonly where: Partial<PostModelAttributes>
}

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {
  findOneBySlug(slug: string): Promise<PostEntity | null>
}
