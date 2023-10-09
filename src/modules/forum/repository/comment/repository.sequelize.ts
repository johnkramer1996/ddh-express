import { SequelizeRepositoryBase } from '@src/shared/infra/database/sequelize/base.repository'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostModelAttributes } from '../../domain/entity/post/types'
import { PostMapper } from '../../mappers/post/mapper'
import { ModelDefined, Model } from 'sequelize'
import { PostVoteRepositoryPort } from '../post-vote/repository.port'
import { POST_TYPES } from '../../di/post.types'
import { COMMENT_VOTE_TYPES } from '../../di/comment-vote.types'
import { COMMENT_TYPES } from '../../di/comment.types'
import { POST_VOTE_TYPES } from '../../di/post-vote.types'
import { inject, injectable } from 'inversify'
import { CommentRepositoryPort, FindCommentsParams } from './repository.port'
import { CommentVotes, PostVotes } from '../../domain/value-objects/votes.value-objcect'
import { CommentMapper } from '../../mappers/comment/mapper'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { CommentModelAttributes } from '../../domain/entity/comments/types'
import { Paginated, QueryParams } from '@src/shared/domain/repository.port'
import PostModel from '@src/shared/infra/database/sequelize/models/post.model'
import CommentVoteModel from '@src/shared/infra/database/sequelize/models/comment-vote.model'
import CommentModel from '@src/shared/infra/database/sequelize/models/comment.model'
import { CommentVoteRepositoryPort } from '../comment-vote/repository.port'
import UserModel from '@src/shared/infra/database/sequelize/models/user.model'
import { sequelize } from '@src/shared/infra/database/sequelize/config/connection'

@injectable()
export class CommentSequelizeRepository extends SequelizeRepositoryBase<CommentEntity, CommentModelAttributes> implements CommentRepositoryPort {
  constructor(
    @inject(COMMENT_TYPES.MAPPER) mapper: CommentMapper,
    @inject(COMMENT_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>,
    @inject(COMMENT_VOTE_TYPES.REPOSITORY) protected commentVoteRepo: CommentVoteRepositoryPort
  ) {
    super(mapper, model)
  }

  public async findByIdWithDetail(id: string, userId: string): Promise<CommentEntity | null> {
    const row = await this.model.findOne({
      where: { id },
      include: [
        { as: 'user', model: UserModel },
        { as: 'votes', model: CommentVoteModel, where: userId ? { userId } : {}, required: false },
      ],
    })

    return row ? this.mapper.toDomain(row) : row
  }

  public async findAllByPostSlug(params: FindCommentsParams): Promise<Paginated<CommentEntity>> {
    const { rows, count } = await this.model.findAndCountAll({
      where: { parentId: null },
      limit: params.limit,
      offset: params.offset,
      order: params.order,
      attributes: {
        include: [
          [
            sequelize.literal(`(
               WITH r AS (
                 SELECT id FROM comments
               )
               SELECT COUNT(*) FROM r
             )`),
            'childCount',
          ],
          // [sequelize.literal(`(SELECT COUNT(*) FROM comment_likes WHERE comment.id = comment_likes.comment_id)`), 'likeCount'],
        ],
      },
      include: [
        { as: 'post', model: PostModel, where: { slug: params.slug } },
        { as: 'user', model: UserModel },
        { as: 'votes', model: CommentVoteModel, where: params.userId ? { userId: params.userId } : {}, required: false },
      ],
    })

    console.log(rows[0])

    return new Paginated({ data: rows.map(this.mapper.toDomain.bind(this.mapper)), count, limit: params.limit, page: params.page })
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
