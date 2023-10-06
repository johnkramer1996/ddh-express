import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../shared/infra/database/sequelize/repository.base'
import { ModelDefined } from 'sequelize'
import { POST_VOTE_TYPES } from '../di/types'
import { PostVoteRepositoryPort } from './post-vote.repository.port'
import { VoteEntity } from '../domain/vote.entity'
import { PostVoteModelAttributes } from '../domain/post-vote.envity'
import { PostVoteMapper } from '../domain/post-vote.mapper'

@injectable()
export class PostVoteSequelizeRepository extends SequelizeRepositoryBase<VoteEntity, PostVoteModelAttributes> implements PostVoteRepositoryPort {
  constructor(@inject(POST_VOTE_TYPES.MAPPER) mapper: PostVoteMapper, @inject(POST_VOTE_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  protected destroyOptions() {
    return { force: true }
  }

  public async findOneByPostIdAndUserId(postId: string, userId: string): Promise<VoteEntity | null> {
    const one = await this.model.findOne({ where: { postId, userId } })
    return one ? this.mapper.toDomain(one) : null
  }
}
