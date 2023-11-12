import { injectable } from 'inversify'
import { DeleteCommentByIdCommand } from './command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { CommentServiceBase } from '../../base.service'
import { ResultWithError } from '@src/shared/core/result'

type Return = void
export type DeleteCommentByIdServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(DeleteCommentByIdCommand)
export class CommentDeleteByIdService extends CommentServiceBase<DeleteCommentByIdCommand, Return> {
  async executeImpl(command: DeleteCommentByIdCommand): Promise<Return> {
    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const comment = await this.commentRepo.findOneById(command.commentId)
    if (!comment) throw new NotFoundException()

    const member = await this.memberRepo.findOneByUserId(command.userId)
    if (!member) throw new NotFoundException()

    this.postService.removeComment(post, member, comment)

    await this.commentRepo.delete(comment)
  }
}
