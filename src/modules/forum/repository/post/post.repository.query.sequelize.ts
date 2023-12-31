import { SequelizeRepositoryQueryBase } from '@src/shared/infra/database/sequelize/base.repository-query'
import { ModelDefined } from 'sequelize'
import { POST_TYPES } from '../../di/post/post.types'
import { inject, injectable } from 'inversify'
import { CountPostsByAuthMemberId, FindPostsParams, PostRepositoryQueryPort } from './post.repository.port'
import { IncludeStrategyPort, Options, Paginated } from '@src/shared/domain/repository.port'
import { PostVotesByAuthMemberIdIncludeStrategy } from './include-strategies/post.votes-by-auth-member-id.include-strategy'
import { PostMemberIncludeStrategy } from './include-strategies/post.member.include-strategy'
import { PostQuery } from '../../domain/entity/post/post.query'
import { PostQueryMapper } from '../../mappers/post/post.mapper-query'
import { ObjectLiteral } from '@src/shared/types/object-literal.type'
import { Op } from 'sequelize'
import { sequelize } from '@src/shared/infra/database/sequelize/config/connection'
import { PostStatus } from '../../domain/entity/post/post.types'

@injectable()
export class PostSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<PostQuery> implements PostRepositoryQueryPort {
  constructor(@inject(POST_TYPES.QUERY_MAPPER) mapper: PostQueryMapper, @inject(POST_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async countByAuthMemberId(memberId: string): Promise<CountPostsByAuthMemberId> {
    const [all] = await sequelize.query("SELECT count(*) count FROM posts WHERE NOT status = 'trash'")
    const [byStatus] = await sequelize.query(
      'SELECT posts.status, COUNT(*) count FROM posts JOIN statuses ON statuses.status=posts.status GROUP BY posts.status, statuses.order ORDER BY "order";'
    )
    const [byMember] = await sequelize.query(`SELECT count(*) count FROM posts where member_id = '${memberId}' AND NOT status = 'trash'`)

    return {
      all: Number((all[0] as any).count),
      byMember: Number((byMember[0] as any).count),
      byStatus: byStatus as { status: PostStatus; count: number }[],
    }
  }

  public async findAllPaginatedWithPostVotesByAuthMemberId(params: FindPostsParams, authMemberId?: string): Promise<Paginated<PostQuery>> {
    const includeStrategies: IncludeStrategyPort[] = []

    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))

    return await this.findAllPaginated(params, { includeStrategies })
  }

  public async findAllPaginated(params: FindPostsParams, options: Options = {}): Promise<Paginated<PostQuery>> {
    const where: ObjectLiteral = {}
    where['status'] = params.status ? params.status : { [Op.ne]: 'trash' }
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
  public async countByStatus() {
    const countByStatus = await sequelize.query('SELECT status, count(*) count FROM posts GROUP BY status')
    console.log({ countByStatus })
    return countByStatus
  }

  public async findBySlug(slug: string, authMemberId?: string): Promise<PostQuery | null> {
    const includeStrategies: IncludeStrategyPort[] = []

    includeStrategies.push(new PostMemberIncludeStrategy())
    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))

    return await this.findOne({ where: { slug }, includeStrategies })
  }
}
