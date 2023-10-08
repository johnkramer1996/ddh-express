import { Container } from 'inversify'
import { COMMENT_TYPES, COMMENT_VOTE_TYPES, POST_TYPES, POST_VOTE_TYPES } from './types'
import { CommentFindAllController } from '../useCases/comments/queries/find-all/controller'
import { CommentFindAllService } from '../useCases/comments/queries/find-all/service'
import { CommentRepositoryPort } from '../repository/comment/repository.port'
import CommentVoteModel from '@src/shared/infra/database/sequelize/models/comment-vote.model'
import { CommentSequelizeRepository } from '../repository/comment/repository.sequelize'
import { CommentMapper } from '../mappers/comment.mapper'
import CommentModel from '@src/shared/infra/database/sequelize/models/comment.model'
import { CommentVoteMapper } from '../mappers/comment-vote.mapper'
import { CommentVoteSequelizeRepository } from '../repository/comment-vote/repository.sequelize'
import { CommentVoteRepositoryPort } from '../repository/comment-vote/repository.port'
import { CommentDeleteOneController } from '../useCases/comments/commands/delete/controller'
import { CommentDeleteOneService } from '../useCases/comments/commands/delete/service'
import { CommentVoteController } from '../useCases/comments/commands/vote/controller'
import { CommentVoteService } from '../useCases/comments/commands/vote/service'

const commentModule = (container: Container) => {
  container.bind(COMMENT_TYPES.MAPPER).to(CommentMapper)
  container.bind<CommentRepositoryPort>(COMMENT_TYPES.REPOSITORY).to(CommentSequelizeRepository)
  container.bind(COMMENT_TYPES.SEQUELIZE_MODEL).toConstantValue(CommentModel)

  container.bind(COMMENT_VOTE_TYPES.MAPPER).to(CommentVoteMapper)
  container.bind<CommentVoteRepositoryPort>(COMMENT_VOTE_TYPES.REPOSITORY).to(CommentVoteSequelizeRepository)
  container.bind(COMMENT_VOTE_TYPES.SEQUELIZE_MODEL).toConstantValue(CommentVoteModel)

  container.bind(CommentFindAllController).toSelf()
  container.bind(CommentFindAllService).toSelf()

  container.bind(CommentDeleteOneController).toSelf()
  container.bind(CommentDeleteOneService).toSelf()

  container.bind(CommentVoteController).toSelf()
  container.bind(CommentVoteService).toSelf()
}

export default commentModule
