import { SequelizeRepositoryBase } from '@src/shared/infra/database/sequelize/base.repository'
import { PostEntity } from '../../domain/entity/post/post.entity'
import { PostModelAttributes } from '../../domain/entity/post/post.types'
import { PostMapper } from '../../mappers/post/post.mapper'
import { ModelDefined } from 'sequelize'
import { PostVoteRepositoryPort } from '../post-vote/post-vote.repository.port'
import { POST_TYPES } from '../../di/post/post.types'
import { POST_VOTE_TYPES } from '../../di/post/post-vote.types'
import { inject, injectable } from 'inversify'
import { PostRepositoryPort } from './post.repository.port'
import { PostVotes } from '../../domain/value-objects/votes.value-objcect'

@injectable()
export class PostSequelizeRepository extends SequelizeRepositoryBase<PostEntity, PostModelAttributes> implements PostRepositoryPort {
  constructor(
    @inject(POST_TYPES.MAPPER) mapper: PostMapper,
    @inject(POST_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>,
    @inject(POST_VOTE_TYPES.REPOSITORY) protected postVoteRepo: PostVoteRepositoryPort
  ) {
    super(mapper, model)
  }

  public async countByPostIdMemberId(memberId: string): Promise<number> {
    return await this.model.count({ where: { memberId } })
  }

  public async findBySlug(slug: string): Promise<PostEntity | null> {
    return this.findOne({ where: { slug } })
  }

  private async savePostVotes(list: PostVotes) {
    await this.postVoteRepo.deleteBulk(list.getRemovedItems())
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
