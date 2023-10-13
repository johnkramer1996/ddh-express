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

    const member = await this.memberRepo.findOneByUserId(command.userId)
    if (!member) throw new NotFoundException()

    this.postService.updateComment(post, member, comment, command.text)

    await this.postRepo.save(post)
  }
}
