import { SequelizeRepositoryBase } from '@src/shared/infra/database/sequelize/repository.base'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostModelAttributes } from '../../domain/entity/post/types'
import { PostMapper } from '../../mappers/post.mapper'
import { ModelDefined } from 'sequelize'
import { PostVoteRepositoryPort } from '../post-vote/post-vote.repository.port'
import { COMMENT_TYPES, COMMENT_VOTE_TYPES, POST_TYPES, POST_VOTE_TYPES } from '../../di/types'
import { inject, injectable } from 'inversify'
import { CommentRepositoryPort, FindCommentsParams } from './repository.port'
import { PostVotes } from '../../domain/value-objects/votes.value-objcect'
import { CommentMapper } from '../../mappers/comment.mapper'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { CommentModelAttributes } from '../../domain/entity/comments/types'
import { Paginated, QueryParams } from '@src/shared/domain/repository.port'
import PostModel from '@src/shared/infra/database/sequelize/models/post.model'

@injectable()
export class CommentSequelizeRepository extends SequelizeRepositoryBase<CommentEntity, CommentModelAttributes> implements CommentRepositoryPort {
  constructor(
    @inject(COMMENT_TYPES.MAPPER) mapper: CommentMapper,
    @inject(COMMENT_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>
    // @inject(COMMENT_VOTE_TYPES.REPOSITORY) protected postVoteRepo: CommentVoteRepositoryPort
  ) {
    super(mapper, model)
  }

  public async findAllByPostSlug(params: FindCommentsParams): Promise<Paginated<CommentEntity>> {
    const { rows: all, count } = await this.model.findAndCountAll({
      limit: params.limit,
      offset: params.offset,
      order: params.order,
      // include: [{ as: 'post', model: PostModel, where: { slug: params.slug } }],
    })

    return new Paginated({ data: all.map(this.mapper.toDomain), count, limit: params.limit, page: params.page })
  }

  // private async savePostVotes(postVotes: PostVotes) {
  //   // await this.postVoteRepo.deleteBulk(postVotes.getRemovedItems())
  //   // await this.postVoteRepo.saveBulk(postVotes.getNewItems())
  // }

  // public async save(entity: PostEntity): Promise<void> {
  //   const rawSequelizePost = this.mapper.toPersistence(entity) as any
  //   const exists = await this.exists(entity.id)
  //   const isNew = !exists

  //   if (isNew) {
  //     await this.model.create(rawSequelizePost)
  //     await this.savePostVotes(entity.votes)
  //   } else {
  //     await this.savePostVotes(entity.votes)
  //     await this.model.update(rawSequelizePost, { where: { id: entity.id } })
  //   }

  //   await entity.publishEvents()
  // }
}
