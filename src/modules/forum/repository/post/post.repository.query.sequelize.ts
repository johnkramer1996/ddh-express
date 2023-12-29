import { SequelizeRepositoryQueryBase } from '@src/shared/infra/database/sequelize/base.repository-query'
import { ModelDefined } from 'sequelize'
import { POST_TYPES } from '../../di/post/post.types'
import { inject, injectable } from 'inversify'
import { FindPostsParams, PostRepositoryQueryPort } from './post.repository.port'
import { IncludeStrategyPort, Options, Paginated } from '@src/shared/domain/repository.port'
import { PostVotesByAuthMemberIdIncludeStrategy } from './include-strategies/post.votes-by-auth-member-id.include-strategy'
import { PostMemberIncludeStrategy } from './include-strategies/post.member.include-strategy'
import { PostQuery } from '../../domain/entity/post/post.query'
import { PostQueryMapper } from '../../mappers/post/post.mapper-query'
import { ObjectLiteral } from '@src/shared/types/object-literal.type'
import { Op } from 'sequelize'

@injectable()
export class PostSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<PostQuery> implements PostRepositoryQueryPort {
  constructor(@inject(POST_TYPES.QUERY_MAPPER) mapper: PostQueryMapper, @inject(POST_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findAllPaginatedWithPostVotesByAuthMemberId(params: FindPostsParams, authMemberId?: string): Promise<Paginated<PostQuery>> {
    const includeStrategies: IncludeStrategyPort[] = []

    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))

    // TODO: DELETE
    // typeof query.moderated === 'boolean' && (where['moderatedAt'] = { [query.moderated ? Op.not : Op.is]: null })
    return await this.findAllPaginated(params, { includeStrategies })
  }

  public async findAllPaginated(params: FindPostsParams, options: Options = {}): Promise<Paginated<PostQuery>> {
    const where: ObjectLiteral = {}
    params.status && (where['status'] = params.status)
    !params.status && (where['status'] = { [Op.ne]: 'trash' })
    params.memberId && (where['memberId'] = params.memberId)

    const includeStrategies: IncludeStrategyPort[] = []

    includeStrategies.push(new PostMemberIncludeStrategy())

    return super.findAllPaginated(params, {
      ...options,
      where: { ...options.where, ...where },
      includeStrategies: [...includeStrategies, ...(options.includeStrategies ?? [])],
      order: params.order,
    })
  }

  public async findBySlug(slug: string, authMemberId?: string): Promise<PostQuery | null> {
    const includeStrategies: IncludeStrategyPort[] = []

    includeStrategies.push(new PostMemberIncludeStrategy())
    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))

    return await this.findOne({ where: { slug }, includeStrategies })
  }
}
