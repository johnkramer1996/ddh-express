import { inject } from 'inversify'
import { ServiceBase } from '@src/shared/core/service.base'
import { POST_TYPES } from '../../di/post/post.types'
import { PostRepositoryPort } from '../../repository/post/repository.port'
import { MemberRepositoryPort } from '../../repository/member/repository.port'
import { MEMBER_TYPES } from '../../di/member/types'

export abstract class PostServiceBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(
    @inject(POST_TYPES.REPOSITORY) protected postRepo: PostRepositoryPort,
    @inject(MEMBER_TYPES.REPOSITORY) protected memberRepo: MemberRepositoryPort
  ) {
    super()
  }
}
