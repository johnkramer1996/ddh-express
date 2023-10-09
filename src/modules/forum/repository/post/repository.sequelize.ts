import { SequelizeRepositoryBase } from '@src/shared/infra/database/sequelize/base.repository'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostModelAttributes } from '../../domain/entity/post/types'
import { PostMapper } from '../../mappers/post/mapper'
import { ModelDefined } from 'sequelize'
import { PostVoteRepositoryPort } from '../post-vote/repository.port'
import { POST_TYPES } from '../../di/post.types'
import { COMMENT_TYPES } from '../../di/comment.types'
import { POST_VOTE_TYPES } from '../../di/post-vote.types'
import { inject, injectable } from 'inversify'
import { PostRepositoryPort } from './repository.port'
import { PostVotes } from '../../domain/value-objects/votes.value-objcect'
import PostVoteModel from '@src/shared/infra/database/sequelize/models/post-vote.model'
import CommentModel from '@src/shared/infra/database/sequelize/models/comment.model'
import { Paginated, QueryParams } from '@src/shared/domain/repository.port'
import { PostFindAllQuery } from '../../useCases/post/queries/find-all/find-all.query'
import { CommentRepositoryPort } from '../comment/repository.port'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { PostComments } from '../../domain/value-objects/comments.value-objcect'
import UserModel from '@src/shared/infra/database/sequelize/models/user.model'

@injectable()
export class PostSequelizeRepository extends SequelizeRepositoryBase<PostEntity, PostModelAttributes> implements PostRepositoryPort {
  constructor(
    @inject(POST_TYPES.MAPPER) mapper: PostMapper,
    @inject(POST_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>,
    @inject(COMMENT_TYPES.REPOSITORY) protected commentRepo: CommentRepositoryPort,
    @inject(POST_VOTE_TYPES.REPOSITORY) protected postVoteRepo: PostVoteRepositoryPort
  ) {
    super(mapper, model)
  }

  public async findAllPaginated(params: PostFindAllQuery): Promise<Paginated<PostEntity>> {
    const { rows, count } = await this.model.findAndCountAll({
      limit: params.limit,
      offset: params.offset,
      order: params.order,
      include: [
        { as: 'comments', model: CommentModel },
        { as: 'votes', model: PostVoteModel, where: params.userId ? { userId: params.userId } : {}, required: false },
      ],
    })

    return new Paginated({ data: rows.map(this.mapper.toDomain.bind(this.mapper)), count, limit: params.limit, page: params.page })
  }

  public async findBySlug(slug: string): Promise<PostEntity | null> {
    const row = await this.model.findOne({
      where: { slug },
    })

    return row ? this.mapper.toDomain(row) : row
  }

  public async findBySlugDetail(slug: string, userId?: string): Promise<PostEntity | null> {
    const row = await this.model.findOne({
      where: { slug },
      include: [
        { as: 'comments', model: CommentModel },
        { as: 'user', model: UserModel },
        { as: 'votes', model: PostVoteModel, where: userId ? { userId } : {}, required: false },
      ],
    })

    return row ? this.mapper.toDomain(row) : row
  }

  private async saveComments(list: PostComments) {
    await this.commentRepo.deleteBulk(list.getRemovedItems(), true)
    await this.commentRepo.saveBulk(list.getNewItems())
  }

  private async savePostVotes(list: PostVotes) {
    await this.postVoteRepo.deleteBulk(list.getRemovedItems(), true)
    await this.postVoteRepo.saveBulk(list.getNewItems())
  }

  public async save(entity: PostEntity): Promise<void> {
    const rawSequelizePost = this.mapper.toPersistence(entity) as any
    const exists = await this.exists(entity.id)
    const isNew = !exists

    if (isNew) {
      await this.model.create(rawSequelizePost)
      await this.saveComments(entity.comments)
      await this.savePostVotes(entity.votes)
    } else {
      await this.saveComments(entity.comments)
      await this.savePostVotes(entity.votes)
      await this.model.update(rawSequelizePost, { where: { id: entity.id } })
    }

    await entity.publishEvents()
  }
}
