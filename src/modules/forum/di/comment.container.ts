import { Container } from 'inversify'
import { POST_TYPES } from './post.types'
import { COMMENT_VOTE_TYPES } from './comment-vote.types'
import { COMMENT_TYPES } from './comment.types'
import { POST_VOTE_TYPES } from './post-vote.types'
import { CommentFindAllController } from '../useCases/comment/queries/find-all/controller'
import { CommentFindAllService } from '../useCases/comment/queries/find-all/service'
import { CommentRepositoryPort } from '../repository/comment/repository.port'
import CommentVoteModel from '@src/shared/infra/database/sequelize/models/comment-vote.model'
import { CommentSequelizeRepository } from '../repository/comment/repository.sequelize'
import { CommentMapper } from '../mappers/comment/mapper'
import CommentModel from '@src/shared/infra/database/sequelize/models/comment.model'
import { CommentVoteMapper } from '../mappers/comment-vote/mapper'
import { CommentVoteSequelizeRepository } from '../repository/comment-vote/repository.sequelize'
import { CommentVoteRepositoryPort } from '../repository/comment-vote/repository.port'
import { CommentDeleteByIdController } from '../useCases/comment/commands/delete/controller'
import { CommentDeleteOneService } from '../useCases/comment/commands/delete/service'
import { CommentVoteController } from '../useCases/comment/commands/vote/controller'
import { CommentVoteService } from '../useCases/comment/commands/vote/service'
import { CommentFindByIdController } from '../useCases/comment/queries/find-by-id/controller'
import { CommentFindByIdService } from '../useCases/comment/queries/find-by-id/service'
import { CommentCreateController } from '../useCases/comment/commands/create/controller'
import { CommentCreateService } from '../useCases/comment/commands/create/service'
import { CommentUpdateService } from '../useCases/comment/commands/update/service'
import { CommentUpdateController } from '../useCases/comment/commands/update/controller'

const commentModule = (container: Container) => {
  container.bind(COMMENT_TYPES.MAPPER).to(CommentMapper)
  container.bind<CommentRepositoryPort>(COMMENT_TYPES.REPOSITORY).to(CommentSequelizeRepository)
  container.bind(COMMENT_TYPES.SEQUELIZE_MODEL).toConstantValue(CommentModel)

  container.bind(COMMENT_VOTE_TYPES.MAPPER).to(CommentVoteMapper)
  container.bind<CommentVoteRepositoryPort>(COMMENT_VOTE_TYPES.REPOSITORY).to(CommentVoteSequelizeRepository)
  container.bind(COMMENT_VOTE_TYPES.SEQUELIZE_MODEL).toConstantValue(CommentVoteModel)

  container.bind(CommentFindAllController).toSelf()
  container.bind(CommentFindAllService).toSelf()

  container.bind(CommentFindByIdController).toSelf()
  container.bind(CommentFindByIdService).toSelf()

  container.bind(CommentCreateController).toSelf()
  container.bind(CommentCreateService).toSelf()

  container.bind(CommentUpdateController).toSelf()
  container.bind(CommentUpdateService).toSelf()

  container.bind(CommentDeleteByIdController).toSelf()
  container.bind(CommentDeleteOneService).toSelf()

  container.bind(CommentVoteController).toSelf()
  container.bind(CommentVoteService).toSelf()
}

export default commentModule
