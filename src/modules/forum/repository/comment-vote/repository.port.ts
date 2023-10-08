import { RepositoryPort } from '@src/shared/domain/repository.port'
import { CommentVoteEntity } from '../../domain/entity/comment-vote/entity'

export interface CommentVoteRepositoryPort extends RepositoryPort<CommentVoteEntity> {
  findOneByCommentIdAndUserId(commentId: string, userId: string): Promise<CommentVoteEntity | null>
}
