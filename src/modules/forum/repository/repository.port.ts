import { QueryParams, RepositoryPort } from '../../../shared/domain/repository.port'
import { PostEntity } from '../domain/post.entity'
import { PostModelAttributes } from '../domain/post.types'

export interface FindPostsParams extends QueryParams {
  readonly where: Partial<PostModelAttributes>
}

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {}
