import { IncludeStrategyPort, Include } from '@src/shared/domain/repository.port'
import MemberModel from '@src/shared/infra/database/sequelize/models/member.model'

export class PostUserIncludeStrategy implements IncludeStrategyPort {
  public apply(): Include {
    return { as: 'member', model: MemberModel }
  }
}
