import { RepositoryPort } from '@src/shared/domain/repository.port'
import { CommentVoteEntity } from '../../domain/entity/comment-vote/comment-vote.entity'

export interface CommentVoteRepositoryPort extends RepositoryPort<CommentVoteEntity> {
  findOneByCommentIdAndMemberId(commentId: string, userId: string): Promise<CommentVoteEntity | null>
}
