import { inject } from 'inversify'
import { POST_TYPES } from '../../infra/di/types'
import { Service } from '@src/shared/core/service'
import { PostRepositoryPort } from '../../repository/repository.port'

export abstract class PostService<T1, T2> extends Service<T1, T2> {
  constructor(@inject(POST_TYPES.REPOSITORY) protected repository: PostRepositoryPort) {
    super(repository)
  }
}
