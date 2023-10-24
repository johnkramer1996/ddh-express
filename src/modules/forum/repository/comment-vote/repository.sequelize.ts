import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../../shared/infra/database/sequelize/base.repository'
import { ModelDefined } from 'sequelize'
import { COMMENT_VOTE_TYPES } from '../../di/comment/comment-vote.types'
import { CommentVoteRepositoryPort } from './repository.port'
import { CommentVoteEntity } from '../../domain/entity/comment-vote/entity'
import { CommentVoteMapper } from '../../mappers/comment-vote/mapper'
import { CommentVoteModelAttributes } from '../../domain/entity/comment-vote/types'

@injectable()
export class CommentVoteSequelizeRepository
  extends SequelizeRepositoryBase<CommentVoteEntity, CommentVoteModelAttributes>
  implements CommentVoteRepositoryPort
{
  constructor(@inject(COMMENT_VOTE_TYPES.MAPPER) mapper: CommentVoteMapper, @inject(COMMENT_VOTE_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  // TODO:
  // MOVE TO COMMENT REPO
  // findVoteByCommentIdAndUserId
  public async findOneByCommentIdAndMemberId(commentId: string, memberId: string): Promise<CommentVoteEntity | null> {
    const row = await this.model.findOne({ where: { commentId, userId: memberId } })

    return row ? this.mapper.toDomain(row) : null
  }
}
