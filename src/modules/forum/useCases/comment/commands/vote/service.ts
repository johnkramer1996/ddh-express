import { injectable } from 'inversify'
import { CommentVoteCommand } from './command'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommentServiceBase } from '../../base.service'

type Return = number
export type VoteCommentServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CommentVoteCommand)
export class VoteCommentService extends CommentServiceBase<CommentVoteCommand, Return> {
  async executeImpl(command: CommentVoteCommand): Promise<Return> {
    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const comment = await this.commentRepo.findOneById(command.commentId)
    if (!comment) throw new NotFoundException()

    const member = await this.memberRepo.findOneByUserId(command.userId)
    if (!member) throw new NotFoundException()

    // this.postService.addVoteToPost(post, member, command.type)

    await this.commentRepo.save(comment)
    // await this.postRepo.save(post)
    return comment.points
  }
}
