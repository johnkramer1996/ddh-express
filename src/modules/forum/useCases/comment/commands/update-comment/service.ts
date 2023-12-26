import { injectable } from 'inversify'
import { UpdateCommentCommand } from './command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { CommentServiceBase } from '../../base.service'
import { ResultWithError } from '@src/shared/core/result'

type Return = void
export type UpdateCommentServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(UpdateCommentCommand)
export class UpdateCommentService extends CommentServiceBase<UpdateCommentCommand, Return> {
  async executeImpl(command: UpdateCommentCommand): Promise<Return> {
    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const comment = await this.commentRepo.findOneById(command.commentId)
    if (!comment) throw new NotFoundException()

    const member = await this.memberRepo.findOneByUserId(command.userId)
    if (!member) throw new NotFoundException()

    this.postService.updateComment(post, member, comment, command.text)

    await this.commentRepo.save(comment)
  }
}
