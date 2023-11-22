import { inject } from 'inversify'
import { ServiceBase } from '@src/shared/core/service.base'
import { POST_TYPES } from '../../di/post/post.types'
import { PostRepositoryPort } from '../../repository/post/repository.port'
import { MemberRepositoryPort } from '../../repository/member/repository.port'
import { MEMBER_TYPES } from '../../di/member/types'
import { PostService } from '../../domain/service/post.service'
import { PostSequelizeRepositoryQuery } from '../../repository/post/repository.sequelize'
import { MemberSequelizeRepositoryQuery } from '../../repository/member/repository.sequelize'
import { PostQueryMapper } from '../../mappers/post/mapper-query'
import { POST_VOTE_TYPES } from '../../di/post/post-vote.types'
import { PostVoteRepositoryPort } from '../../repository/post-vote/repository.port'

export abstract class PostServiceBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(
    @inject(POST_TYPES.REPOSITORY) protected postRepo: PostRepositoryPort,
    @inject(MEMBER_TYPES.REPOSITORY) protected memberRepo: MemberRepositoryPort,
    @inject(POST_VOTE_TYPES.REPOSITORY) protected postVoteRepo: PostVoteRepositoryPort,
    @inject(PostService) protected postService: PostService
  ) {
    super()
  }
}

export abstract class PostServiceQueryBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(
    @inject(PostSequelizeRepositoryQuery) protected postRepo: PostSequelizeRepositoryQuery,
    @inject(MemberSequelizeRepositoryQuery) protected memberRepo: MemberSequelizeRepositoryQuery,
    @inject(POST_TYPES.QUERY_MAPPER) protected postMapper: PostQueryMapper
  ) {
    super()
  }
}
