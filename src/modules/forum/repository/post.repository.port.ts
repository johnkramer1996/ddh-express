import { QueryParams, RepositoryPort } from '../../../shared/domain/repository.port'
import { PostEntity } from '../domain/post.entity'
import { VoteEntity } from '../domain/vote.entity'

export interface FindPostsParams extends QueryParams {}

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {
  findOneBySlug(slug: string): Promise<PostEntity | null>
}
