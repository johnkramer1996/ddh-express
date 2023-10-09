import { inject, injectable } from 'inversify'
import { ServiceBase } from '@src/shared/core/service.base'
import { POST_TYPES } from '../../di/post.types'
import { COMMENT_VOTE_TYPES } from '../../di/comment-vote.types'
import { COMMENT_TYPES } from '../../di/comment.types'
import { CommentRepositoryPort } from '../../repository/comment/repository.port'
import { USER_TYPES } from '@src/modules/user/di/user.types'
import { PostService } from '../../domain/service/post.service'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { PostRepositoryPort } from '../../repository/post/repository.port'
import { CommentVoteRepositoryPort } from '../../repository/comment-vote/repository.port'

@injectable()
export abstract class CommentServiceBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(
    @inject(COMMENT_TYPES.REPOSITORY) protected commentRepo: CommentRepositoryPort,
    @inject(USER_TYPES.REPOSITORY) protected userRepo: UserRepositoryPort,
    @inject(POST_TYPES.REPOSITORY) protected postRepo: PostRepositoryPort,
    @inject(COMMENT_VOTE_TYPES.REPOSITORY) protected upvoteRepo: CommentVoteRepositoryPort,
    @inject(PostService) protected postService: PostService
  ) {
    super()
  }
}
