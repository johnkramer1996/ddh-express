import { injectable } from 'inversify'
import { CommentUpdateCommand } from './command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { CommentServiceBase } from '../../base.service'
import { ResultWithError } from '@src/shared/core/result'

type Return = void
export type CommentUpdateServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CommentUpdateCommand)
export class CommentUpdateService extends CommentServiceBase<CommentUpdateCommand, Return> {
  async executeImpl(command: CommentUpdateCommand): Promise<Return> {
    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const comment = await this.commentRepo.findOneById(command.commentId)
    if (!comment) throw new NotFoundException()

    const user = await this.userRepo.findOneById(command.userId)
    if (!user) throw new NotFoundException()

    this.postService.updateComment(post, user, comment, command.text)

    await this.postRepo.save(post)
  }
}
