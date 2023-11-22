import { SequelizeRepositoryQueryBase } from '@src/shared/infra/database/sequelize/base-query.repository'
import { ModelDefined } from 'sequelize'
import { COMMENT_TYPES } from '../../di/comment/comment.types'
import { inject, injectable } from 'inversify'
import { CommentModelAttributes } from '../../domain/entity/comments/types'
import { AttributeStrategyPort, IncludeStrategyPort, Options, Paginated, QueryParams } from '@src/shared/domain/repository.port'
import { CommentMemberIncludeStrategy } from './include-strategies/comment-user.include-strategy'
import { CommentVotesIncludeStrategy } from './include-strategies/comment-votes.include-strategy'
import { CommentCountChildAttributeStrategy } from './attribute-strategies/comment-count-child-attribute-strategy'
import { CommentCountLikesAttributeStrategy } from './attribute-strategies/comment-count-likes.attribute-strategy'
import { CommentByPostSlugIncludeStrategy } from './include-strategies/comment-by-post-slug.include-strategy'
import { CommentQueryMapper } from '../../mappers/comment/mapper-query'
import { CommentResponseDto } from '../../dtos/comment/response.dto'
import { CommentQuery } from '../../domain/entity/comments/query'

export interface FindCommentsParams extends QueryParams {}

@injectable()
export class CommentSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<CommentQuery, CommentModelAttributes, CommentResponseDto> {
  constructor(@inject(COMMENT_TYPES.QUERY_MAPPER) mapper: CommentQueryMapper, @inject(COMMENT_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findOneByIdAndAuthUserId(commentId: string, authUserId?: string): Promise<CommentQuery | null> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentMemberIncludeStrategy())
    authUserId && includeStrategies.push(new CommentVotesIncludeStrategy(authUserId))

    attributeStrategies.push(new CommentCountChildAttributeStrategy())
    attributeStrategies.push(new CommentCountLikesAttributeStrategy())

    return await this.findOneById(commentId, { includeStrategies, attributeStrategies })
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
    const entity = await this.findOneByIdAndAuthUserId(commentId, userId)
    if (!entity) return null

    return entity
  }

  //TODO: RENAME
  public async findOneByIdWithNestedComments2(commentId: string, userId?: string): Promise<CommentQuery[] | null> {
    const entity = await this.findOneByIdAndAuthUserId(commentId, userId)
    if (!entity) return null

    const children = await this.findAllNestedCommentsQuery(entity, userId)

    return children
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

  private async findAllNestedComments(comments: CommentQuery[], options: Options = {}): Promise<CommentQuery[]> {
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
