import { SequelizeRepositoryBase } from '@src/shared/infra/database/sequelize/base.repository'
import { ModelDefined, Includeable } from 'sequelize'
import { COMMENT_VOTE_TYPES } from '../../di/comment-vote.types'
import { COMMENT_TYPES } from '../../di/comment.types'
import { inject, injectable } from 'inversify'
import { CommentRepositoryPort, FindCommentsParams } from './repository.port'
import { CommentVotes } from '../../domain/value-objects/votes.value-objcect'
import { CommentMapper } from '../../mappers/comment/mapper'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { CommentModelAttributes } from '../../domain/entity/comments/types'
import { AttributeStrategyPort, IncludeStrategyPort, Options, Paginated } from '@src/shared/domain/repository.port'
import { CommentVoteRepositoryPort } from '../comment-vote/repository.port'
import CommentModel from '@src/shared/infra/database/sequelize/models/comment.model'
import { CommentUserIncludeStrategy } from './include-strategies/CommentUserIncludeStrategy'
import { CommentVotesIncludeStrategy } from './include-strategies/CommentVotesIncludeStrategy'
import { CommentCountChildAttributeStrategy } from './attribute-strategies/CommentCountChildAttributeStrategy'
import { CommentCountLikesAttributeStrategy } from './attribute-strategies/CommentCountLikesAttributeStrategy'
import { CommentByPostSlugIncludeStrategy } from './include-strategies/CommentByPostSlugIncludeStrategy'

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

  public async findAllPaginatedDetail(query: FindCommentsParams): Promise<Paginated<CommentEntity>> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentByPostSlugIncludeStrategy(query.slug))
    query.userId && includeStrategies.push(new CommentVotesIncludeStrategy(query.userId))
    includeStrategies.push(new CommentUserIncludeStrategy())

    attributeStrategies.push(new CommentCountChildAttributeStrategy())
    attributeStrategies.push(new CommentCountLikesAttributeStrategy())

    return this.findAllPaginated(query, { where: { parentId: null }, includeStrategies, attributeStrategies })
  }

  public async findOneByIdWithNestedCommentsDetail(commentId: string, userId?: string): Promise<CommentEntity | null> {
    const entity = await this.findOneByIdDetail(commentId, userId)
    if (!entity) return null

    entity.children = await this.findAllNestedCommentsDetail(entity, userId)

    return entity
  }

  public async findOneByIdDetail(commentId: string, userId?: string): Promise<CommentEntity | null> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentUserIncludeStrategy())
    userId && includeStrategies.push(new CommentVotesIncludeStrategy(userId))

    attributeStrategies.push(new CommentCountChildAttributeStrategy())
    attributeStrategies.push(new CommentCountLikesAttributeStrategy())

    return await this.findOneById(commentId, { includeStrategies, attributeStrategies })
  }

  public async findAllNestedCommentsDetail(comment: CommentEntity, userId?: string): Promise<CommentEntity[]> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentUserIncludeStrategy())
    userId && includeStrategies.push(new CommentVotesIncludeStrategy(userId))

    attributeStrategies.push(new CommentCountChildAttributeStrategy())
    attributeStrategies.push(new CommentCountLikesAttributeStrategy())

    return await this.findAllNestedComments([comment], { includeStrategies, attributeStrategies })
  }

  public async findAllNestedComments(comments: CommentEntity[], options: Options = {}): Promise<CommentEntity[]> {
    if (!comments.length) return []

    const childs = await this.findChildrenComments(comments)
    return [...childs, ...(await this.findAllNestedComments(childs, options))]
  }

  public async findChildrenComments(comments: CommentEntity[], options: Options = {}): Promise<CommentEntity[]> {
    return (await Promise.all(comments.map((comment) => this.findChildrenComment(comment, options)))).flat()
  }

  public async findChildrenComment(comment: CommentEntity, options: Options = {}): Promise<CommentEntity[]> {
    return await this.findAll({ ...options, where: { parentId: comment.id } })
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
