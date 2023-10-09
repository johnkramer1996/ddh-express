import { inject, injectable } from 'inversify'
import { CommentDeleteOneCommand } from './command'
import { ForbiddenException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { CommentServiceBase } from '../../base.service'
import { ResultWithError } from '@src/shared/core/result'
import { USER_TYPES } from '@src/modules/user/di/user.types'
import { POST_TYPES } from '@src/modules/forum/di/post.types'
import { COMMENT_VOTE_TYPES } from '@src/modules/forum/di/comment-vote.types'
import { COMMENT_TYPES } from '@src/modules/forum/di/comment.types'
import { PostRepositoryPort } from '@src/modules/forum/repository/post/repository.port'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { CommentRepositoryPort } from '@src/modules/forum/repository/comment/repository.port'
import { CommentVoteRepositoryPort } from '@src/modules/forum/repository/comment-vote/repository.port'
import { PostService } from '@src/modules/forum/domain/service/post.service'

type Return = void
export type DeleteCommentServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CommentDeleteOneCommand)
export class CommentDeleteOneService extends CommentServiceBase<CommentDeleteOneCommand, Return> {
  async executeImpl(command: CommentDeleteOneCommand): Promise<Return> {
    const post = await this.postRepo.findBySlugDetail(command.slug)
    if (!post) throw new NotFoundException()

    const comment = await this.commentRepo.findOneById(command.commentId)
    if (!comment) throw new NotFoundException()

    const user = await this.userRepo.findOneById(command.userId)
    if (!user) throw new NotFoundException()

    this.postService.removeComment(post, user, comment)

    await this.postRepo.save(post)
  }
}
