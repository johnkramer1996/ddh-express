import { Options, OrderBy, Paginated, QueryParams, RepositoryPort, RepositoryQueryPort } from '../../../../shared/domain/repository.port'
import { PostEntity } from '../../domain/entity/post/post.entity'
import { PostQuery } from '../../domain/entity/post/post.query'
import { PostStatus } from '../../domain/entity/post/post.types'

export interface FindPostsParams extends QueryParams {
  status?: PostStatus
  memberId?: string
  moderated?: boolean
  order?: OrderBy[]
}

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {
  countByPostIdMemberId(memberId: string): Promise<number>
  findBySlug(slug: string): Promise<PostEntity | null>
}

export interface PostRepositoryQueryPort extends RepositoryQueryPort<PostQuery> {
  findAllPaginatedWithPostVotesByAuthMemberId(query: FindPostsParams, authMemberId?: string): Promise<Paginated<PostQuery>>
  findBySlug(slug: string, authMemberId?: string): Promise<PostQuery | null>
}
