import { Container } from 'inversify'
import { COMMENT_VOTE_TYPES } from './comment-vote.types'
import { COMMENT_TYPES } from './comment.types'
import { FindCommentsController } from '../../useCases/comment/queries/find-comments/controller'
import { FindCommentsQueryHandler } from '../../useCases/comment/queries/find-comments/service'
import { CommentRepositoryPort } from '../../repository/comment/repository.port'
import CommentVoteModel from '@src/shared/infra/database/sequelize/models/comment-vote.model'
import { CommentSequelizeRepository, CommentSequelizeRepositoryQuery } from '../../repository/comment/repository.sequelize'
import { CommentMapper } from '../../mappers/comment/mapper-domain'
import CommentModel from '@src/shared/infra/database/sequelize/models/comment.model'
import { CommentVoteMapper } from '../../mappers/comment-vote/mapper'
import { CommentVoteSequelizeRepository } from '../../repository/comment-vote/repository.sequelize'
import { CommentVoteRepositoryPort } from '../../repository/comment-vote/repository.port'
import { DeleteCommentByIdController } from '../../useCases/comment/commands/delete-comment/controller'
import { CommentDeleteByIdService } from '../../useCases/comment/commands/delete-comment/service'
import { CommentVoteController } from '../../useCases/comment/commands/vote-comment/controller'
import { VoteCommentService } from '../../useCases/comment/commands/vote-comment/service'
import { CommentFindByIdController } from '../../useCases/comment/queries/find-comment-by-id/controller'
import { CommentFindByIdService } from '../../useCases/comment/queries/find-comment-by-id/service'
import { CommentCreateController } from '../../useCases/comment/commands/create-comment/controller'
import { CommentCreateService } from '../../useCases/comment/commands/create-comment/service'
import { CommentUpdateService } from '../../useCases/comment/commands/update-comment/service'
import { CommentUpdateController } from '../../useCases/comment/commands/update-comment/controller'
import { CommentQueryMapper } from '../../mappers/comment/mapper-query'

const commentModule = (container: Container) => {
  container.bind(COMMENT_TYPES.MAPPER).to(CommentMapper)
  container.bind(COMMENT_TYPES.QUERY_MAPPER).to(CommentQueryMapper)
  container.bind<CommentRepositoryPort>(COMMENT_TYPES.REPOSITORY).to(CommentSequelizeRepository)
  container.bind(COMMENT_TYPES.SEQUELIZE_MODEL).toConstantValue(CommentModel)

  container.bind(COMMENT_VOTE_TYPES.MAPPER).to(CommentVoteMapper)
  container.bind<CommentVoteRepositoryPort>(COMMENT_VOTE_TYPES.REPOSITORY).to(CommentVoteSequelizeRepository)
  container.bind(COMMENT_VOTE_TYPES.SEQUELIZE_MODEL).toConstantValue(CommentVoteModel)

  container.bind(CommentSequelizeRepositoryQuery).toSelf()

  container.bind(FindCommentsController).toSelf()
  container.bind(FindCommentsQueryHandler).toSelf()

  container.bind(CommentFindByIdController).toSelf()
  container.bind(CommentFindByIdService).toSelf()

  container.bind(CommentCreateController).toSelf()
  container.bind(CommentCreateService).toSelf()

  container.bind(CommentUpdateController).toSelf()
  container.bind(CommentUpdateService).toSelf()

  container.bind(DeleteCommentByIdController).toSelf()
  container.bind(CommentDeleteByIdService).toSelf()

  container.bind(CommentVoteController).toSelf()
  container.bind(VoteCommentService).toSelf()
}

export default commentModule
