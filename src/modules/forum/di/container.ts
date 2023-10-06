import { Container } from 'inversify'
import { POST_TYPES, POST_VOTE_TYPES } from './types'
import { PostSequelizeRepository } from '../repository/post.repository.sequelize'
import UserModel from '@src/shared/infra/database/sequelize/models/user.model'
import { FindPostsController } from '../useCases/queries/find-all/find-all.controller'
import { FindPostsService } from '../useCases/queries/find-all/find-all.service'
import { PostMapper } from '../domain/post.mapper'
import PostModel from '@src/shared/infra/database/sequelize/models/post.model'
import { PostRepositoryPort } from '../repository/post.repository.port'
import { CreateOneController } from '../useCases/command/create-one/create-one.controller'
import { CreateOneService } from '../useCases/command/create-one/create-one.service'
import { FindBySlugController } from '../useCases/queries/find-by-slug/find-by-slug.controller'
import { FindBySlugService } from '../useCases/queries/find-by-slug/find-by-slug.service'
import { UpvoteController } from '../useCases/command/vote/vote.controller'
import { VoteService } from '../useCases/command/vote/vote.service'
import { PostVoteRepositoryPort } from '../repository/post-vote.repository.port'
import { PostVoteSequelizeRepository } from '../repository/post-vote.repository.sequelize'
import PostVoteModel from '@src/shared/infra/database/sequelize/models/post-vote.model'
import { PostVoteMapper } from '../domain/post-vote.mapper'
import { PostService } from '../domain/service/post.service'

const postModule = (container: Container) => {
  container.bind(POST_TYPES.MAPPER).to(PostMapper)
  container.bind<PostRepositoryPort>(POST_TYPES.REPOSITORY).to(PostSequelizeRepository)
  container.bind(POST_TYPES.SEQUELIZE_MODEL).toConstantValue(PostModel)

  container.bind(POST_VOTE_TYPES.MAPPER).to(PostVoteMapper)
  container.bind<PostVoteRepositoryPort>(POST_VOTE_TYPES.REPOSITORY).to(PostVoteSequelizeRepository)
  container.bind(POST_VOTE_TYPES.SEQUELIZE_MODEL).toConstantValue(PostVoteModel)

  container.bind(PostService).toSelf()

  container.bind(FindPostsController).toSelf()
  container.bind(FindPostsService).toSelf()

  container.bind(CreateOneController).toSelf()
  container.bind(CreateOneService).toSelf()

  container.bind(FindBySlugController).toSelf()
  container.bind(FindBySlugService).toSelf()

  container.bind(UpvoteController).toSelf()
  container.bind(VoteService).toSelf()
}

export default postModule
