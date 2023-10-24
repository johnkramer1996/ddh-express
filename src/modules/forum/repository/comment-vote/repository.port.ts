import { RepositoryPort } from '@src/shared/domain/repository.port'
import { CommentVoteEntity } from '../../domain/entity/comment-vote/entity'

export interface CommentVoteRepositoryPort extends RepositoryPort<CommentVoteEntity> {
  // TODO:
  // https://www.alibabacloud.com/blog/an-in-depth-understanding-of-aggregation-in-domain-driven-design_598034
  // Therefore, an aggregate can have only one repository object in terms of design constraints, which is a repository named after the aggregate root. No other objects should be provided with repository objects.
  findOneByCommentIdAndMemberId(commentId: string, userId: string): Promise<CommentVoteEntity | null>
}
