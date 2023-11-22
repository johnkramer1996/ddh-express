import { Container } from 'inversify'
import { POST_TYPES } from './post.types'
import { POST_VOTE_TYPES } from './post-vote.types'
import { FindPostsController } from '../../useCases/post/queries/find-posts/controller'
import { FindPostsService } from '../../useCases/post/queries/find-posts/service'
import { PostMapper } from '../../mappers/post/mapper-domain'
import PostModel from '@src/shared/infra/database/sequelize/models/post.model'
import { PostRepositoryPort } from '../../repository/post/repository.port'
import { CreatePostController } from '../../useCases/post/commands/create-post/controller'
import { CreateOneService as CreatePostService } from '../../useCases/post/commands/create-post/service'
import { FindPostBySlugController } from '../../useCases/post/queries/find-post-by-slug/controller'
import { FindPostBySlugService } from '../../useCases/post/queries/find-post-by-slug/service'
import { VotePostController } from '../../useCases/post/commands/vote-post/controller'
import { VotePostService } from '../../useCases/post/commands/vote-post/service'
import { PostVoteSequelizeRepository } from '../../repository/post-vote/repository.sequelize'
import PostVoteModel from '@src/shared/infra/database/sequelize/models/post-vote.model'
import { PostVoteMapper } from '../../mappers/post-vote/mapper'
import { PostService } from '../../domain/service/post.service'
import { PostVoteRepositoryPort } from '../../repository/post-vote/repository.port'
import { PostSequelizeRepository, PostSequelizeRepositoryQuery } from '../../repository/post/repository.sequelize'
import { FindPostsByLoginController } from '../../useCases/post/queries/find-posts-by-user-login/controller'
import { FindPostsByLoginService } from '../../useCases/post/queries/find-posts-by-user-login/service'
import { PostQueryMapper } from '../../mappers/post/mapper-query'
import { FindPostsByAuthUserController } from '../../useCases/post/queries/find-posts-by-auth-user/controller'
import { FindPostsByAuthUserService } from '../../useCases/post/queries/find-posts-by-auth-user/service'

const postModule = (container: Container) => {
  container.bind(POST_TYPES.MAPPER).to(PostMapper)
  container.bind(POST_TYPES.QUERY_MAPPER).to(PostQueryMapper)
  container.bind<PostRepositoryPort>(POST_TYPES.REPOSITORY).to(PostSequelizeRepository)
  container.bind(POST_TYPES.SEQUELIZE_MODEL).toConstantValue(PostModel)

  container.bind(POST_VOTE_TYPES.MAPPER).to(PostVoteMapper)
  container.bind<PostVoteRepositoryPort>(POST_VOTE_TYPES.REPOSITORY).to(PostVoteSequelizeRepository)
  container.bind(POST_VOTE_TYPES.SEQUELIZE_MODEL).toConstantValue(PostVoteModel)

  container.bind(PostService).toSelf()
  container.bind(PostSequelizeRepositoryQuery).toSelf()

  container.bind(FindPostsController).toSelf()
  container.bind(FindPostsService).toSelf()

  container.bind(CreatePostController).toSelf()
  container.bind(CreatePostService).toSelf()

  container.bind(FindPostBySlugController).toSelf()
  container.bind(FindPostBySlugService).toSelf()

  container.bind(VotePostController).toSelf()
  container.bind(VotePostService).toSelf()

  container.bind(FindPostsByLoginController).toSelf()
  container.bind(FindPostsByLoginService).toSelf()

  container.bind(FindPostsByAuthUserController).toSelf()
  container.bind(FindPostsByAuthUserService).toSelf()
}

export default postModule
