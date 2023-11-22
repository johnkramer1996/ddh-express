import { RepositoryPort } from '../../../../shared/domain/repository.port'
import { CommentEntity } from '../../domain/entity/comments/entity'

export interface CommentRepositoryPort extends RepositoryPort<CommentEntity> {
  countCommentsByPostIdMemberId(postId: string, memberId: string): Promise<number>
}
