import { UserQuery } from '@src/modules/user/domain/user.query'
import { Paginated, QueryParams, RepositoryPort, RepositoryQueryPort } from '../../../../shared/domain/repository.port'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostQuery } from '../../domain/entity/post/query'
import { PostResponseDto } from '../../dtos/post/response.dto'

export interface FindPostsParams extends QueryParams {}

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {
  countByPostIdMemberId(memberId: string): Promise<number>
  findBySlug(slug: string): Promise<PostEntity | null>
}

export interface PostRepositoryQueryPort extends RepositoryQueryPort<PostQuery> {
  findAllPaginatedWithAuthMeberId(query: FindPostsParams, authMemberId?: string): Promise<Paginated<PostQuery>>
  findAllPaginatedByMemberId(query: FindPostsParams, memberId: string, authMemberId?: string): Promise<Paginated<PostQuery>>
  findBySlugQuery(slug: string, authMemberId?: string): Promise<PostResponseDto | null>
}
