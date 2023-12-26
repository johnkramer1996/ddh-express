import { IncludeStrategyPort, Include } from '@src/shared/domain/repository.port'
import MemberModel from '@src/shared/infra/database/sequelize/models/member.model'
import { UserModel } from '@src/shared/infra/database/sequelize/models/user.model'

export class PostMemberIncludeStrategy implements IncludeStrategyPort {
  public apply(): Include {
    return { as: 'member', model: MemberModel, include: [{ as: 'user', model: UserModel }] }
  }
}
