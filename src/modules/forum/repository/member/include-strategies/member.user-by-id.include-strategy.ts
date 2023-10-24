import { IncludeStrategyPort, Include } from '@src/shared/domain/repository.port'
import UserModel from '@src/shared/infra/database/sequelize/models/user.model'

export class MemberUserByIdIncludeStrategy implements IncludeStrategyPort {
  public apply(): Include {
    return { as: 'user', model: UserModel }
  }
}
