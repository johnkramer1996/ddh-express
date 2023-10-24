import { SequelizeRepositoryBase } from '@src/shared/infra/database/sequelize/base.repository'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostModelAttributes } from '../../domain/entity/post/types'
import { PostMapper } from '../../mappers/post/mapper'
import { ModelDefined } from 'sequelize'
import { PostVoteRepositoryPort } from '../post-vote/repository.port'
import { POST_TYPES } from '../../di/post/post.types'
import { POST_VOTE_TYPES } from '../../di/post/post-vote.types'
import { inject, injectable } from 'inversify'
import { FindPostsByMemberParams, FindPostsParams, PostRepositoryPort } from './repository.port'
import { PostVotes } from '../../domain/value-objects/votes.value-objcect'
import { IncludeStrategyPort, Paginated } from '@src/shared/domain/repository.port'
import { PostVotesByAuthMemberIdIncludeStrategy } from './include-strategies/post.votes-by-auth-member-id.include-strategy'
import { PostUserIncludeStrategy } from './include-strategies/post.member.include-strategy'
import { PostVoteEntity } from '../../domain/entity/post-vote/entity'
import { PostResponseDto } from '../../dtos/post/response.dto'

@injectable()
export class PostSequelizeRepository extends SequelizeRepositoryBase<PostEntity, PostModelAttributes> implements PostRepositoryPort {
  constructor(
    @inject(POST_TYPES.MAPPER) mapper: PostMapper,
    @inject(POST_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>,
    @inject(POST_VOTE_TYPES.REPOSITORY) protected postVoteRepo: PostVoteRepositoryPort
  ) {
    super(mapper, model)
  }

  public async findAllPaginatedQuery(query: FindPostsParams, authMemberId?: string): Promise<Paginated<PostResponseDto>> {
    const includeStrategies: IncludeStrategyPort[] = []

    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))
    includeStrategies.push(new PostUserIncludeStrategy())

    // TODO:
    // CALL DIRECT THIS
    const paginated = await this.findAllPaginated(query, { includeStrategies })

    return {
      ...paginated,
      data: paginated.data.map(this.mapper.toResponse.bind(this.mapper)),
    }
  }

  public async findAllPaginatedByMemberIdQuery(query: FindPostsByMemberParams, authMemberId?: string): Promise<Paginated<PostResponseDto>> {
    const includeStrategies: IncludeStrategyPort[] = []

    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))
    includeStrategies.push(new PostUserIncludeStrategy())

    const paginated = await this.findAllPaginated(query, { where: { memberId: query.memberId }, includeStrategies })

    return {
      ...paginated,
      data: paginated.data.map(this.mapper.toResponse.bind(this.mapper)),
    }
  }

  public async findBySlugQuery(slug: string): Promise<PostResponseDto | null> {
    const post = await this.findOne({ where: { slug } })
    return post ? this.mapper.toResponse(post) : null
  }

  async findVoteByPostIdAndMemberId(postId: string, memberId: string): Promise<PostVoteEntity | null> {
    return this.postVoteRepo.findOneByPostIdAndMemberId(postId, memberId)
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

    // TODO: WRAP IN TRANSACTION
    // https://khalilstemmler.com/articles/typescript-domain-driven-design/aggregate-design-persistence/
    // I've chosen to manually apply rollbacks because it's much simpler for now.
    try {
      if (isNew) {
        await this.model.create(rawSequelizePost)
        // await this.saveComments(post.comments)
        await this.savePostVotes(post.votes)
      } else {
        // await this.saveComments(post.comments)
        await this.savePostVotes(post.votes)
        await this.model.update(rawSequelizePost, { where: { id: post.id } })
      }
    } catch {
      // this.rollbackSave(post);
    }

    await post.publishEvents()
  }
}
