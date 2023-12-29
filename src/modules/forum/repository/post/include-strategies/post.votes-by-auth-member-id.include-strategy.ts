import { IncludeStrategyPort, Include } from '@src/shared/domain/repository.port'
import { PostVoteModel } from '@src/shared/infra/database/sequelize/models/post-vote.model'

export class PostVotesByAuthMemberIdIncludeStrategy implements IncludeStrategyPort {
  constructor(private authMemberId: string) {}

  public apply(): Include {
    return { as: 'votes', model: PostVoteModel, where: { memberId: this.authMemberId }, required: false }
  }
}
