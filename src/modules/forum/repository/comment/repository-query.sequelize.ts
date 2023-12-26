import { SequelizeRepositoryQueryBase } from '@src/shared/infra/database/sequelize/base-query.repository'
import { ModelDefined } from 'sequelize'
import { COMMENT_TYPES } from '../../di/comment/comment.types'
import { inject, injectable } from 'inversify'
import { CommentModelAttributes } from '../../domain/entity/comments/types'
import { AttributeStrategyPort, IncludeStrategyPort, Options, Paginated, QueryParams } from '@src/shared/domain/repository.port'
import { CommentMemberIncludeStrategy } from './include-strategies/comment-user.include-strategy'
import { CommentVotesIncludeStrategy } from './include-strategies/comment-votes.include-strategy'
import { CommentCountChildAttributeStrategy } from './attribute-strategies/comment-count-child-attribute-strategy'
import { CommentByPostSlugIncludeStrategy } from './include-strategies/comment-by-post-slug.include-strategy'
import { CommentQueryMapper } from '../../mappers/comment/mapper-query'
import { CommentQuery } from '../../domain/entity/comments/query'
import { CommentRepositoryQueryPort, FindCommentsParams } from './repository.port'

@injectable()
export class CommentSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<CommentQuery> implements CommentRepositoryQueryPort {
  constructor(@inject(COMMENT_TYPES.QUERY_MAPPER) mapper: CommentQueryMapper, @inject(COMMENT_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findOneByIdAndAuthUserId(commentId: string, authUserId?: string): Promise<CommentQuery | null> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentMemberIncludeStrategy())
    authUserId && includeStrategies.push(new CommentVotesIncludeStrategy(authUserId))

    attributeStrategies.push(new CommentCountChildAttributeStrategy())

    return this.findOneById(commentId, { includeStrategies, attributeStrategies })
  }

  public async findAllPaginatedBySlug(query: FindCommentsParams, slug: string, authMemberId?: string): Promise<Paginated<CommentQuery>> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentByPostSlugIncludeStrategy(slug))
    includeStrategies.push(new CommentMemberIncludeStrategy())
    authMemberId && includeStrategies.push(new CommentVotesIncludeStrategy(authMemberId))

    attributeStrategies.push(new CommentCountChildAttributeStrategy())

    return this.findAllPaginated(query, { where: { parentId: null }, includeStrategies, attributeStrategies })
  }

  public async findChildrenComment(comment: CommentQuery, authUserId?: string): Promise<CommentQuery[]> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentMemberIncludeStrategy())
    authUserId && includeStrategies.push(new CommentVotesIncludeStrategy(authUserId))

    attributeStrategies.push(new CommentCountChildAttributeStrategy())

    return this._findChildrenComment(comment, { includeStrategies, attributeStrategies })
  }

  public async findAllChildrenComment(comment: CommentQuery, authUserId?: string): Promise<CommentQuery[]> {
    const includeStrategies: IncludeStrategyPort[] = []
    const attributeStrategies: AttributeStrategyPort[] = []

    includeStrategies.push(new CommentMemberIncludeStrategy())
    authUserId && includeStrategies.push(new CommentVotesIncludeStrategy(authUserId))

    attributeStrategies.push(new CommentCountChildAttributeStrategy())

    return this._findAllNestedComments([comment], { includeStrategies, attributeStrategies })
  }

  private async _findAllNestedComments(comments: CommentQuery[], options: Options = {}): Promise<CommentQuery[]> {
    if (!comments.length) return []

    const childs = await this._findChildrenComments(comments, options)
    return [...childs, ...(await this._findAllNestedComments(childs, options))]
  }

  private async _findChildrenComments(comments: CommentQuery[], options: Options = {}): Promise<CommentQuery[]> {
    return (await Promise.all(comments.map((comment) => this._findChildrenComment(comment, options)))).flat()
  }

  private async _findChildrenComment(comment: CommentQuery, options: Options = {}): Promise<CommentQuery[]> {
    return this.findAll({ ...options, where: { parentId: comment.id } })
  }
}
