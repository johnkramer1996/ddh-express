import { SequelizeRepositoryBase, SequelizeRepositoryQueryBase } from '@src/shared/infra/database/sequelize/base.repository'
import { ModelDefined, Includeable } from 'sequelize'
import { COMMENT_VOTE_TYPES } from '../../di/comment/comment-vote.types'
import { COMMENT_TYPES } from '../../di/comment/comment.types'
import { inject, injectable } from 'inversify'
import { CommentRepositoryPort, FindCommentsParams } from './repository.port'
import { CommentVotes } from '../../domain/value-objects/votes.value-objcect'
import { CommentMapper } from '../../mappers/comment/mapper-domain'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { CommentModelAttributes } from '../../domain/entity/comments/types'
import { AttributeStrategyPort, IncludeStrategyPort, Options, Paginated } from '@src/shared/domain/repository.port'
import { CommentVoteRepositoryPort } from '../comment-vote/repository.port'
import CommentModel from '@src/shared/infra/database/sequelize/models/comment.model'
import { CommentMemberIncludeStrategy } from './include-strategies/comment-user.include-strategy'
import { CommentVotesIncludeStrategy } from './include-strategies/comment-votes.include-strategy'
import { CommentCountChildAttributeStrategy } from './attribute-strategies/comment-count-child-attribute-strategy'
import { CommentCountLikesAttributeStrategy } from './attribute-strategies/comment-count-likes.attribute-strategy'
import { CommentByPostSlugIncludeStrategy } from './include-strategies/comment-by-post-slug.include-strategy'
import { CommentQueryMapper } from '../../mappers/comment/mapper-query'
import { CommentResponseDto } from '../../dtos/comment/response.dto'
import { CommentQuery } from '../../domain/entity/comments/query'

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

@injectable()
export class CommentSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<CommentQuery, CommentModelAttributes, CommentResponseDto> {
  constructor(@inject(COMMENT_TYPES.QUERY_MAPPER) mapper: CommentQueryMapper, @inject(COMMENT_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findAllPaginatedBySlug(query: FindCommentsParams, slug: string, authMemberId?: string): Promise<Paginated<CommentQuery>> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentByPostSlugIncludeStrategy(slug))
    authMemberId && includeStrategies.push(new CommentVotesIncludeStrategy(authMemberId))
    includeStrategies.push(new CommentMemberIncludeStrategy())

    attributeStrategies.push(new CommentCountChildAttributeStrategy())
    attributeStrategies.push(new CommentCountLikesAttributeStrategy())

    return this.findAllPaginated(query, { where: { parentId: null }, includeStrategies, attributeStrategies })
  }

  public async findAllPaginatedBySlugQuery(query: FindCommentsParams, slug: string, authMemberId?: string): Promise<Paginated<CommentQuery>> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentByPostSlugIncludeStrategy(slug))
    authMemberId && includeStrategies.push(new CommentVotesIncludeStrategy(authMemberId))
    includeStrategies.push(new CommentMemberIncludeStrategy())

    attributeStrategies.push(new CommentCountChildAttributeStrategy())
    attributeStrategies.push(new CommentCountLikesAttributeStrategy())

    return this.findAllPaginated(query, { where: { parentId: null }, includeStrategies, attributeStrategies })
  }

  public async findOneByIdWithNestedComments(commentId: string, userId?: string): Promise<CommentQuery | null> {
    const entity = await this.findOneByIdUserId(commentId, userId)
    if (!entity) return null

    // entity.children = await this.findAllNestedCommentsQuery(entity, userId)

    return entity
  }

  public async findOneByIdUserId(commentId: string, userId?: string): Promise<CommentQuery | null> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentMemberIncludeStrategy())
    userId && includeStrategies.push(new CommentVotesIncludeStrategy(userId))

    attributeStrategies.push(new CommentCountChildAttributeStrategy())
    attributeStrategies.push(new CommentCountLikesAttributeStrategy())

    return await this.findOneById(commentId, { includeStrategies, attributeStrategies })
  }

  public async findAllNestedCommentsQuery(comment: CommentQuery, userId?: string): Promise<CommentQuery[]> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentMemberIncludeStrategy())
    userId && includeStrategies.push(new CommentVotesIncludeStrategy(userId))

    attributeStrategies.push(new CommentCountChildAttributeStrategy())
    attributeStrategies.push(new CommentCountLikesAttributeStrategy())

    return await this.findAllNestedComments([comment], { includeStrategies, attributeStrategies })
  }

  public async findAllNestedComments(comments: CommentQuery[], options: Options = {}): Promise<CommentQuery[]> {
    if (!comments.length) return []

    const childs = await this.findChildrenComments(comments, options)
    return [...childs, ...(await this.findAllNestedComments(childs, options))]
  }

  public async findChildrenComments(comments: CommentQuery[], options: Options = {}): Promise<CommentQuery[]> {
    return (await Promise.all(comments.map((comment) => this.findChildrenComment(comment, options)))).flat()
  }

  public async findChildrenComment(comment: CommentQuery, options: Options = {}): Promise<CommentQuery[]> {
    return await this.findAll({ ...options, where: { parentId: comment.id } })
  }
}
