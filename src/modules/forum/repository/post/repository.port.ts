import { Paginated, QueryParams, RepositoryPort } from '../../../../shared/domain/repository.port'
import { PostVoteEntity } from '../../domain/entity/post-vote/entity'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostResponseDto } from '../../dtos/post/response.dto'

export interface FindPostsParams extends QueryParams {}
export interface FindPostsByMemberParams extends QueryParams {
  memberId: string
}

export interface PostRepositoryPort extends RepositoryPort<PostEntity> {
  findBySlug(slug: string): Promise<PostEntity | null>
  // findVoteByPostIdAndMemberId(postId: string, memberId: string): Promise<PostVoteEntity | null>
}
