import { Container } from 'inversify'
import { COMMENT_VOTE_TYPES } from './comment-vote.types'
import { COMMENT_TYPES } from './comment.types'
import { FindCommentsController } from '../../useCases/comment/queries/find-comments/find-comments.controller'
import { FindCommentsQueryHandler } from '../../useCases/comment/queries/find-comments/find-comments.service'
import { CommentRepositoryPort, CommentRepositoryQueryPort } from '../../repository/comment/comment.repository.port'
import CommentVoteModel from '@src/shared/infra/database/sequelize/models/comment-vote.model'
import { CommentSequelizeRepository } from '../../repository/comment/comment.repository.sequelize'
import { CommentMapper } from '../../mappers/comment/comment.mapper'
import { CommentModel } from '@src/shared/infra/database/sequelize/models/comment.model'
import { CommentVoteMapper } from '../../mappers/comment-vote/comment-vote.mapper'
import { CommentVoteSequelizeRepository } from '../../repository/comment-vote/comment-vote.repository.sequelize'
import { CommentVoteRepositoryPort } from '../../repository/comment-vote/comment-vote.repository.port'
import { DeleteCommentByIdController } from '../../useCases/comment/commands/delete-comment/delete-comment.controller'
import { CommentDeleteByIdService } from '../../useCases/comment/commands/delete-comment/delete-comment.service'
import { VoteCommentController } from '../../useCases/comment/commands/vote-comment/vote-comment.controller'
import { VoteCommentService } from '../../useCases/comment/commands/vote-comment/vote-comment.service'
import { FindCommentByIdController } from '../../useCases/comment/queries/find-comment-by-id/find-comment-by-id.controller'
import { FindCommentByIdService } from '../../useCases/comment/queries/find-comment-by-id/find-comment-by-id.service'
import { CreateCommentController } from '../../useCases/comment/commands/create-comment/create-comment.controller'
import { CreateCommentService } from '../../useCases/comment/commands/create-comment/create-comment.service'
import { UpdateCommentService } from '../../useCases/comment/commands/update-comment/update-comment.service'
import { UpdateCommentController } from '../../useCases/comment/commands/update-comment/update-comment.controller'
import { CommentQueryMapper } from '../../mappers/comment/comment.mapper-query'
import { FindChildrenCommentByIdController } from '../../useCases/comment/queries/find-children-comment-by-id/find-children-comment-by-id.controller'
import { FindChildrenCommentByIdService } from '../../useCases/comment/queries/find-children-comment-by-id/find-children-comment-by-id.service'
import { FindAllChildrenCommentByIdService } from '../../useCases/comment/queries/find-all-children-comment-by-id/find-all-children-comment-by-id.service'
import { FindAllChildrenCommentByIdController } from '../../useCases/comment/queries/find-all-children-comment-by-id/find-all-children-comment-by-id.controller'
import { CommentSequelizeRepositoryQuery } from '../../repository/comment/comment.repository-query.sequelize'

export const commentModule = (container: Container) => {
  container.bind(COMMENT_TYPES.MAPPER).to(CommentMapper)
  container.bind(COMMENT_TYPES.QUERY_MAPPER).to(CommentQueryMapper)
  container.bind<CommentRepositoryPort>(COMMENT_TYPES.REPOSITORY).to(CommentSequelizeRepository)
  container.bind<CommentRepositoryQueryPort>(COMMENT_TYPES.QUERY_REPOSITORY).to(CommentSequelizeRepositoryQuery)
  container.bind(COMMENT_TYPES.SEQUELIZE_MODEL).toConstantValue(CommentModel)

  container.bind(COMMENT_VOTE_TYPES.MAPPER).to(CommentVoteMapper)
  container.bind<CommentVoteRepositoryPort>(COMMENT_VOTE_TYPES.REPOSITORY).to(CommentVoteSequelizeRepository)
  container.bind(COMMENT_VOTE_TYPES.SEQUELIZE_MODEL).toConstantValue(CommentVoteModel)

  container.bind(FindCommentsController).toSelf()
  container.bind(FindCommentsQueryHandler).toSelf()

  container.bind(FindCommentByIdController).toSelf()
  container.bind(FindCommentByIdService).toSelf()

  container.bind(FindChildrenCommentByIdController).toSelf()
  container.bind(FindChildrenCommentByIdService).toSelf()

  container.bind(FindAllChildrenCommentByIdController).toSelf()
  container.bind(FindAllChildrenCommentByIdService).toSelf()

  container.bind(CreateCommentController).toSelf()
  container.bind(CreateCommentService).toSelf()

  container.bind(UpdateCommentController).toSelf()
  container.bind(UpdateCommentService).toSelf()

  container.bind(DeleteCommentByIdController).toSelf()
  container.bind(CommentDeleteByIdService).toSelf()

  container.bind(VoteCommentController).toSelf()
  container.bind(VoteCommentService).toSelf()
}
