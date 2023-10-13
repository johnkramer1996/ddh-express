import { SequelizeRepositoryBase } from '@src/shared/infra/database/sequelize/base.repository'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostModelAttributes } from '../../domain/entity/post/types'
import { PostMapper } from '../../mappers/post/mapper'
import { ModelDefined } from 'sequelize'
import { PostVoteRepositoryPort } from '../post-vote/repository.port'
import { POST_TYPES } from '../../di/post/post.types'
import { COMMENT_TYPES } from '../../di/comment/comment.types'
import { POST_VOTE_TYPES } from '../../di/post/post-vote.types'
import { inject, injectable } from 'inversify'
import { FindPostsByMemberParams, FindPostsParams, PostRepositoryPort } from './repository.port'
import { PostVotes } from '../../domain/value-objects/votes.value-objcect'
import { IncludeStrategyPort, Paginated } from '@src/shared/domain/repository.port'
import { FindPostsQuery } from '../../useCases/post/queries/find-all/query'
import { CommentRepositoryPort } from '../comment/repository.port'
import { PostComments } from '../../domain/value-objects/comments.value-objcect'
import { PostVotesByAuthMemberIdIncludeStrategy } from './include-strategies/post.votes-by-auth-member-id.include-strategy'
import { PostUserIncludeStrategy } from './include-strategies/post.member.include-strategy'
import { PostCommentsIncludeStrategy } from './include-strategies/post.comments.include-strategy'

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

  public async findAllPaginatedDetailByMemberId(query: FindPostsByMemberParams): Promise<Paginated<PostEntity>> {
    const includeStrategies: IncludeStrategyPort[] = []

    query.authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(query.authMemberId))
    includeStrategies.push(new PostUserIncludeStrategy())

    return this.findAllPaginated(query, { where: { memberId: query.memberId }, includeStrategies })
  }

  public async findAllPaginatedDetail(query: FindPostsParams): Promise<Paginated<PostEntity>> {
    const includeStrategies: IncludeStrategyPort[] = []

    query.authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(query.authMemberId))
    includeStrategies.push(new PostUserIncludeStrategy())

    return this.findAllPaginated(query, { includeStrategies })
  }

  public async findBySlug(slug: string): Promise<PostEntity | null> {
    return this.findOne({ where: { slug } })
  }

  public async findBySlugDetail(slug: string, authMemberId?: string): Promise<PostEntity | null> {
    const includeStrategies: IncludeStrategyPort[] = []

    authMemberId && includeStrategies.push(new PostVotesByAuthMemberIdIncludeStrategy(authMemberId))
    includeStrategies.push(new PostUserIncludeStrategy())
    includeStrategies.push(new PostCommentsIncludeStrategy())

    return this.findOne({ where: { slug }, includeStrategies })
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
