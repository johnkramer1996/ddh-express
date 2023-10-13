import { Paginated, QueryParams, RepositoryPort } from '../../../../shared/domain/repository.port'
import { PostEntity } from '../../domain/entity/post/entity'

export interface FindPostsParams extends QueryParams {
  authMemberId?: string
}
export interface FindPostsByMemberParams extends FindPostsParams {
  memberId: string
}

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {
  findAllPaginatedDetail(params: FindPostsParams): Promise<Paginated<PostEntity>>
  findAllPaginatedDetailByMemberId(params: FindPostsByMemberParams): Promise<Paginated<PostEntity>>
  findBySlug(slug: string): Promise<PostEntity | null>
  findBySlugDetail(slug: string, authMemberId?: string): Promise<PostEntity | null>
}
