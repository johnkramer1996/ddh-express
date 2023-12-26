import { Paginated, QueryParams, RepositoryPort, RepositoryQueryPort } from '../../../../shared/domain/repository.port'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { CommentQuery } from '../../domain/entity/comments/query'

export interface FindCommentsParams extends QueryParams {}

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  countByPostIdMemberId(postId: string, memberId: string): Promise<number>
}

export interface CommentRepositoryQueryPort extends RepositoryQueryPort<CommentQuery> {
  findOneByIdAndAuthUserId(commentId: string, authUserId?: string): Promise<CommentQuery | null>
  findAllPaginatedBySlug(query: FindCommentsParams, slug: string, authMemberId?: string): Promise<Paginated<CommentQuery>>
  findChildrenComment(comment: CommentQuery, authUserId?: string): Promise<CommentQuery[]>
  findAllChildrenComment(comment: CommentQuery, authUserId?: string): Promise<CommentQuery[]>
}
