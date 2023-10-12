import { injectable } from 'inversify'
import { CommentDeleteOneCommand } from './command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { CommentServiceBase } from '../../base.service'
import { ResultWithError } from '@src/shared/core/result'

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
