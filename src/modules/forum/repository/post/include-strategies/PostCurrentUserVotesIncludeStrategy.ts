import { IncludeStrategyPort, Include } from '@src/shared/domain/repository.port'
import PostVoteModel from '@src/shared/infra/database/sequelize/models/post-vote.model'

export class PostCurrentUserVotesIncludeStrategy implements IncludeStrategyPort {
  constructor(private userId: string) {}

  public apply(): Include {
    return { as: 'votes', model: PostVoteModel, where: { userId: this.userId }, required: false }
  }
}
