import { Options, Paginated, QueryParams, RepositoryPort, RepositoryQueryPort } from '../../../../shared/domain/repository.port'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostQuery } from '../../domain/entity/post/query'
import { PostStatus } from '../../domain/entity/post/types'
import { PostResponseDto } from '../../dtos/post/response.dto'

export interface FindPostsParams extends QueryParams {
  status?: PostStatus
  moderated?: boolean
  memberId?: string
}

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {
  countByPostIdMemberId(memberId: string): Promise<number>
  findBySlug(slug: string): Promise<PostEntity | null>
}

export interface PostRepositoryQueryPort extends RepositoryQueryPort<PostQuery> {
  findAllPaginatedWithAuthMeberId(query: FindPostsParams, authMemberId?: string): Promise<Paginated<PostQuery>>
  findBySlug(slug: string, authMemberId?: string): Promise<PostResponseDto | null>
}
