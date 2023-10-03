import { Container } from 'inversify'
import { POST_TYPES } from './types'
import { PostSequelizeRepository } from '../repository/repository.sequelize'
import UserModel from '@src/shared/infra/database/sequelize/models/user.model'
import { FindPostsController } from '../useCases/queries/find-all/find-all.controller'
import { FindPostsService } from '../useCases/queries/find-all/find-all.service'
import { PostMapper } from '../domain/post.mapper'
import PostModel from '@src/shared/infra/database/sequelize/models/post.model'
import { PostRepositoryPort } from '../repository/repository.port'
import { CreateOneController } from '../useCases/command/create-one.controller'
import { CreateOneService } from '../useCases/command/create-one.service'

const postModule = (container: Container) => {
  container.bind(POST_TYPES.MAPPER).to(PostMapper)
  container.bind<PostRepositoryPort>(POST_TYPES.REPOSITORY).to(PostSequelizeRepository)
  container.bind(POST_TYPES.SEQUELIZE_MODEL).toConstantValue(PostModel)

  container.bind(FindPostsController).toSelf()
  container.bind(FindPostsService).toSelf()

  container.bind(CreateOneController).toSelf()
  container.bind(CreateOneService).toSelf()
}

export default postModule
