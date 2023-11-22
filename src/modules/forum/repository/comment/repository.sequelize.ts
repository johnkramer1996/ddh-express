import { SequelizeRepositoryBase } from '@src/shared/infra/database/sequelize/base.repository'
import { ModelDefined, Includeable } from 'sequelize'
import { COMMENT_VOTE_TYPES } from '../../di/comment/comment-vote.types'
import { COMMENT_TYPES } from '../../di/comment/comment.types'
import { inject, injectable } from 'inversify'
import { CommentRepositoryPort } from './repository.port'
import { CommentVotes } from '../../domain/value-objects/votes.value-objcect'
import { CommentMapper } from '../../mappers/comment/mapper-domain'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { CommentModelAttributes } from '../../domain/entity/comments/types'
import { CommentVoteRepositoryPort } from '../comment-vote/repository.port'
import CommentModel from '@src/shared/infra/database/sequelize/models/comment.model'

@injectable()
export class CommentSequelizeRepository extends SequelizeRepositoryBase<CommentEntity, CommentModelAttributes> implements CommentRepositoryPort {
  declare model: typeof CommentModel

  constructor(
    @inject(COMMENT_TYPES.MAPPER) mapper: CommentMapper,
    @inject(COMMENT_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>,
    @inject(COMMENT_VOTE_TYPES.REPOSITORY) protected commentVoteRepo: CommentVoteRepositoryPort
  ) {
    super(mapper, model)
  }

  public async countCommentsByPostIdMemberId(postId: string, memberId: string): Promise<number> {
    return await this.model.count({ where: { postId, memberId } })
  }

  private async savePostVotes(votes: CommentVotes) {
    await this.commentVoteRepo.deleteBulk(votes.getRemovedItems())
    await this.commentVoteRepo.saveBulk(votes.getNewItems())
  }

  public async save(entity: CommentEntity): Promise<void> {
    const rawSequelizePost = this.mapper.toPersistence(entity) as any
    const exists = await this.exists(entity.id)
    const isNew = !exists

    if (isNew) {
      await this.model.create(rawSequelizePost)
      await this.savePostVotes(entity.votes)
    } else {
      await this.savePostVotes(entity.votes)
      await this.model.update(rawSequelizePost, { where: { id: entity.id } })
    }

    await entity.publishEvents()
  }
}
