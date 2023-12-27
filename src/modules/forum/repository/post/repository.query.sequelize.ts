import { SequelizeRepositoryQueryBase } from '@src/shared/infra/database/sequelize/base-query.repository'
import { ModelDefined } from 'sequelize'
import { POST_TYPES } from '../../di/post/post.types'
import { inject, injectable } from 'inversify'
import { FindPostsParams, PostRepositoryQueryPort } from './repository.port'
import { IncludeStrategyPort, Options, Paginated } from '@src/shared/domain/repository.port'
import { PostVotesByAuthMemberIdIncludeStrategy } from './include-strategies/post.votes-by-auth-member-id.include-strategy'
import { PostMemberIncludeStrategy } from './include-strategies/post.member.include-strategy'
import { PostResponseDto } from '../../dtos/post/response.dto'
import { PostQuery } from '../../domain/entity/post/query'
import { PostQueryMapper } from '../../mappers/post/mapper-query'
import { ObjectLiteral } from '@src/shared/types/object-literal.type'
import { Op } from 'sequelize'

@injectable()
export class PostSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<PostQuery> implements PostRepositoryQueryPort {
  constructor(@inject(POST_TYPES.QUERY_MAPPER) mapper: PostQueryMapper, @inject(POST_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findAllPaginatedWithAuthMeberId(query: FindPostsParams, authMemberId?: string): Promise<Paginated<PostQuery>> {
    const includeStrategies: IncludeStrategyPort[] = []

    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))
    includeStrategies.push(new PostMemberIncludeStrategy())

    const where: ObjectLiteral = {}
    query.status && (where['status'] = query.status)
    query.memberId && (where['memberId'] = query.memberId)
    typeof query.moderated === 'boolean' && (where['moderatedAt'] = { [query.moderated ? Op.not : Op.is]: null })

    console.log(where)

    return await this.findAllPaginated(query, { where, ...includeStrategies })
  }

  public async findBySlug(slug: string, authMemberId?: string): Promise<PostResponseDto | null> {
    const includeStrategies: IncludeStrategyPort[] = []

    includeStrategies.push(new PostMemberIncludeStrategy())
    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))

    const post = await this.findOne({ where: { slug }, includeStrategies })
    return post ? this.mapper.toResponse(post) : null
  }
}
