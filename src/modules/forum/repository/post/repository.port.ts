import { Options } from 'slug'
import { Paginated, QueryParams, RepositoryPort } from '../../../../shared/domain/repository.port'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostFindAllQuery } from '../../useCases/post/queries/find-all/query'

export interface FindPostsParams extends QueryParams {
  userId?: string
}
export interface FindPostsByMemberParams extends FindPostsParams {
  memberId: string
}

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {
  findAllPaginatedDetail(params: FindPostsParams): Promise<Paginated<PostEntity>>
  findAllPaginatedDetailByMemberId(params: FindPostsByMemberParams): Promise<Paginated<PostEntity>>
  findBySlug(slug: string): Promise<PostEntity | null>
  findBySlugDetail(slug: string, userId?: string): Promise<PostEntity | null>
}
