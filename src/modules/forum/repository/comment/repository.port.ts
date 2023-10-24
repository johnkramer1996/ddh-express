import { Paginated, QueryParams, RepositoryPort } from '../../../../shared/domain/repository.port'
import { CommentEntity } from '../../domain/entity/comments/entity'

export interface FindCommentsParams extends QueryParams {}

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  // findAllPaginatedBySlugQuery(params: FindCommentsParams, slug: string, authMemberId?: string): Promise<Paginated<CommentEntity>>
  // findOneByIdWithNestedCommentsQuery(commentId: string, authMemberId?: string): Promise<CommentEntity | null>
  countCommentsByPostIdMemberId(postId: string, memberId: string): Promise<number>
}
