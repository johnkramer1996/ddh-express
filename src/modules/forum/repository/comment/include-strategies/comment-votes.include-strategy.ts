import CommentVoteModel from '@src/shared/infra/database/sequelize/models/comment-vote.model'
import { IncludeStrategyPort, Include } from '@src/shared/domain/repository.port'

export class CommentVotesIncludeStrategy implements IncludeStrategyPort {
  constructor(private memberId: string) {}

  public apply(): Include {
    return { as: 'votes', model: CommentVoteModel, where: { memberId: this.memberId }, required: false }
  }
}
