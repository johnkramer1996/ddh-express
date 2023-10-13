import { Container } from 'inversify'
import { POST_TYPES } from './post.types'
import { POST_VOTE_TYPES } from './post-vote.types'
import { FindPostsController } from '../../useCases/post/queries/find-all/controller'
import { FindPostsService } from '../../useCases/post/queries/find-all/service'
import { PostMapper } from '../../mappers/post/mapper'
import PostModel from '@src/shared/infra/database/sequelize/models/post.model'
import { PostRepositoryPort } from '../../repository/post/repository.port'
import { PostCreateOneController } from '../../useCases/post/commands/create-one/controller'
import { CreateOneService } from '../../useCases/post/commands/create-one/service'
import { FindBySlugController } from '../../useCases/post/queries/find-by-slug/controller'
import { FindBySlugService } from '../../useCases/post/queries/find-by-slug/service'
import { PostVoteController } from '../../useCases/post/commands/vote/controller'
import { PostVoteService } from '../../useCases/post/commands/vote/service'
import { PostVoteSequelizeRepository } from '../../repository/post-vote/repository.sequelize'
import PostVoteModel from '@src/shared/infra/database/sequelize/models/post-vote.model'
import { PostVoteMapper } from '../../mappers/post-vote/mapper'
import { PostService } from '../../domain/service/post.service'
import { PostVoteRepositoryPort } from '../../repository/post-vote/repository.port'
import { PostSequelizeRepository } from '../../repository/post/repository.sequelize'
import { PostFindAllByLoginController } from '../../useCases/post/queries/find-all-by-login/controller'
import { PostFindAllByLoginService } from '../../useCases/post/queries/find-all-by-login/service'

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

  container.bind(PostCreateOneController).toSelf()
  container.bind(CreateOneService).toSelf()

  container.bind(FindBySlugController).toSelf()
  container.bind(FindBySlugService).toSelf()

  container.bind(PostVoteController).toSelf()
  container.bind(PostVoteService).toSelf()

  container.bind(PostFindAllByLoginController).toSelf()
  container.bind(PostFindAllByLoginService).toSelf()
}

export default postModule
