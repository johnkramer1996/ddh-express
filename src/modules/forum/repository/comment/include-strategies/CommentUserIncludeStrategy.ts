import UserModel from '@src/shared/infra/database/sequelize/models/user.model'
import { IncludeStrategyPort, Include } from '@src/shared/domain/repository.port'

export class CommentUserIncludeStrategy implements IncludeStrategyPort {
  public apply(): Include {
    return { as: 'user', model: UserModel }
  }
}
