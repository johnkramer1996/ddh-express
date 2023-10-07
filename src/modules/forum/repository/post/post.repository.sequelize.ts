import { SequelizeRepositoryBase } from '@src/shared/infra/database/sequelize/repository.base'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostModelAttributes } from '../../domain/entity/post/types'
import { PostMapper } from '../../mappers/post.mapper'
import { ModelDefined } from 'sequelize'
import { PostVoteRepositoryPort } from '../post-vote/post-vote.repository.port'
import { POST_TYPES, POST_VOTE_TYPES } from '../../di/types'
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

  public async findOneBySlug(slug: string): Promise<PostEntity | null> {
    const one = await this.model.findOne({ where: { slug } })
    return one ? this.mapper.toDomain(one) : one
  }

  private async savePostVotes(postVotes: PostVotes) {
    await this.postVoteRepo.deleteBulk(postVotes.getRemovedItems())
    await this.postVoteRepo.saveBulk(postVotes.getNewItems())
  }

  public async save(entity: PostEntity): Promise<void> {
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
