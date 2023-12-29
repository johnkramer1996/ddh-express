import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../../shared/infra/database/sequelize/base.repository'
import { ModelDefined } from 'sequelize'
import { COMMENT_VOTE_TYPES } from '../../di/comment/comment-vote.types'
import { CommentVoteRepositoryPort } from './comment-vote.repository.port'
import { CommentVoteEntity } from '../../domain/entity/comment-vote/comment-vote.entity'
import { CommentVoteMapper } from '../../mappers/comment-vote/comment-vote.mapper'
import { CommentVoteModelAttributes } from '../../domain/entity/comment-vote/comment-vote.types'

@injectable()
export class CommentVoteSequelizeRepository
  extends SequelizeRepositoryBase<CommentVoteEntity, CommentVoteModelAttributes>
  implements CommentVoteRepositoryPort
{
  constructor(@inject(COMMENT_VOTE_TYPES.MAPPER) mapper: CommentVoteMapper, @inject(COMMENT_VOTE_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findOneByCommentIdAndMemberId(commentId: string, memberId: string): Promise<CommentVoteEntity | null> {
    const row = await this.model.findOne({ where: { commentId, memberId } })

    return row ? this.mapper.toDomain(row) : null
  }
}
