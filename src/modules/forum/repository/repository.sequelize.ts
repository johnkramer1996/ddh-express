import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../shared/infra/database/sequelize/repository.base'
import { ModelDefined } from 'sequelize'
import { PostEntity } from '../domain/post.entity'
import { PostModelAttributes } from '../domain/post.types'
import { POST_TYPES } from '../infra/di/types'
import { PostMapper } from '../domain/post.mapper'
import { PostRepositoryPort } from './repository.port'

@injectable()
export class PostSequelizeRepository extends SequelizeRepositoryBase<PostEntity, PostModelAttributes> implements PostRepositoryPort {
  constructor(@inject(POST_TYPES.MAPPER) mapper: PostMapper, @inject(POST_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }
}
