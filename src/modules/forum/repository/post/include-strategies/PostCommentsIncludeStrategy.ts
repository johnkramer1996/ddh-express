import { IncludeStrategyPort, Include } from '@src/shared/domain/repository.port'
import CommentModel from '@src/shared/infra/database/sequelize/models/comment.model'

export class PostCommentsIncludeStrategy implements IncludeStrategyPort {
  public apply(): Include {
    return { as: 'comments', model: CommentModel }
  }
}
