import PostModel from '@src/shared/infra/database/sequelize/models/post.model'
import { IncludeStrategyPort, Include } from '@src/shared/domain/repository.port'

export class CommentByPostSlugIncludeStrategy implements IncludeStrategyPort {
  constructor(private slug: string) {}

  public apply(): Include {
    return { as: 'post', model: PostModel, where: { slug: this.slug } }
  }
}
