import { IncludeStrategyPort, Include } from '@src/shared/domain/repository.port'
import UserModel from '@src/shared/infra/database/sequelize/models/user.model'

export class MemberUserIncludeStrategy implements IncludeStrategyPort {
  constructor(private login: string) {}

  public apply(): Include {
    return { as: 'user', model: UserModel, where: { login: this.login } }
  }
}
