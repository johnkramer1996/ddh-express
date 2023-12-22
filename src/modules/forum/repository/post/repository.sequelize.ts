import { SequelizeRepositoryBase } from '@src/shared/infra/database/sequelize/base.repository'
import { SequelizeRepositoryQueryBase } from '@src/shared/infra/database/sequelize/base-query.repository'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostModelAttributes } from '../../domain/entity/post/types'
import { PostMapper } from '../../mappers/post/mapper-domain'
import { ModelDefined } from 'sequelize'
import { PostVoteRepositoryPort } from '../post-vote/repository.port'
import { POST_TYPES } from '../../di/post/post.types'
import { POST_VOTE_TYPES } from '../../di/post/post-vote.types'
import { inject, injectable } from 'inversify'
import { FindPostsByMemberParams, FindPostsParams, PostRepositoryPort } from './repository.port'
import { PostVotes } from '../../domain/value-objects/votes.value-objcect'
import { IncludeStrategyPort, Paginated } from '@src/shared/domain/repository.port'
import { PostVotesByAuthMemberIdIncludeStrategy } from './include-strategies/post.votes-by-auth-member-id.include-strategy'
import { PostMemberIncludeStrategy } from './include-strategies/post.member.include-strategy'
import { PostVoteEntity } from '../../domain/entity/post-vote/entity'
import { PostResponseDto } from '../../dtos/post/response.dto'
import { PostQuery } from '../../domain/entity/post/query'
import { PostQueryMapper } from '../../mappers/post/mapper-query'

@injectable()
export class PostSequelizeRepository extends SequelizeRepositoryBase<PostEntity, PostModelAttributes> implements PostRepositoryPort {
  constructor(
    @inject(POST_TYPES.MAPPER) mapper: PostMapper,
    @inject(POST_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>,
    @inject(POST_VOTE_TYPES.REPOSITORY) protected postVoteRepo: PostVoteRepositoryPort
  ) {
    super(mapper, model)
  }

  public async findBySlug(slug: string): Promise<PostEntity | null> {
    return this.findOne({ where: { slug } })
  }

  private async savePostVotes(list: PostVotes) {
    await this.postVoteRepo.deleteBulk(list.getRemovedItems(), true)
    await this.postVoteRepo.saveBulk(list.getNewItems())
  }

  public async save(post: PostEntity): Promise<void> {
    const rawSequelizePost = this.mapper.toPersistence(post) as any
    const exists = await this.exists(post.id)
    const isNew = !exists

    if (isNew) {
      await this.model.create(rawSequelizePost)
      await this.savePostVotes(post.votes)
    } else {
      await this.savePostVotes(post.votes)
      await this.model.update(rawSequelizePost, { where: { id: post.id } })
    }

    await post.publishEvents()
  }
}

@injectable()
export class PostSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<PostQuery, PostModelAttributes, PostResponseDto> {
  constructor(@inject(POST_TYPES.QUERY_MAPPER) mapper: PostQueryMapper, @inject(POST_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findAllPaginatedAuth(query: FindPostsParams, authMemberId?: string): Promise<Paginated<PostQuery>> {
    const includeStrategies: IncludeStrategyPort[] = []

    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))
    includeStrategies.push(new PostMemberIncludeStrategy())

    return await super.findAllPaginated(query, { includeStrategies })
  }

  public async findAllPaginatedByMemberId(query: FindPostsByMemberParams, authMemberId?: string): Promise<Paginated<PostQuery>> {
    const includeStrategies: IncludeStrategyPort[] = []

    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))
    includeStrategies.push(new PostMemberIncludeStrategy())

    return await this.findAllPaginated(query, { where: { memberId: query.memberId }, includeStrategies })
  }

  public async findBySlugQuery(slug: string, authMemberId?: string): Promise<PostResponseDto | null> {
    const includeStrategies: IncludeStrategyPort[] = []

    includeStrategies.push(new PostMemberIncludeStrategy())
    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))

    const post = await this.findOne({ where: { slug }, includeStrategies })
    return post ? this.mapper.toResponse(post) : null
  }
}
