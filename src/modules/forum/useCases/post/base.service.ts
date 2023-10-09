import { inject } from 'inversify'
import { ServiceBase } from '@src/shared/core/service.base'
import { POST_TYPES } from '../../di/post.types'
import { PostRepositoryPort } from '../../repository/post/repository.port'

export abstract class PostServiceBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(@inject(POST_TYPES.REPOSITORY) protected postRepo: PostRepositoryPort) {
    super()
  }
}
