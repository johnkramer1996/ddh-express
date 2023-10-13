import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../../shared/infra/database/sequelize/base.repository'
import { ModelDefined } from 'sequelize'
import { POST_VOTE_TYPES } from '../../di/post/post-vote.types'
import { PostVoteRepositoryPort } from './repository.port'
import { PostVoteModelAttributes } from '../../domain/entity/post-vote/types'
import { PostVoteMapper } from '../../mappers/post-vote/mapper'
import { PostVoteEntity } from '../../domain/entity/post-vote/entity'

@injectable()
export class PostVoteSequelizeRepository extends SequelizeRepositoryBase<PostVoteEntity, PostVoteModelAttributes> implements PostVoteRepositoryPort {
  constructor(@inject(POST_VOTE_TYPES.MAPPER) mapper: PostVoteMapper, @inject(POST_VOTE_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findOneByPostIdAndUserId(postId: string, userId: string): Promise<PostVoteEntity | null> {
    const one = await this.model.findOne({ where: { postId, userId } })
    return one ? this.mapper.toDomain(one) : null
  }
}
