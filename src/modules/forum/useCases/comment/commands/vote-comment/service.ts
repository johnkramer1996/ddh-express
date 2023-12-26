import { injectable } from 'inversify'
import { VoteCommentCommand } from './command'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommentServiceBase } from '../../base.service'
import { MemberIsBannedError } from '@src/modules/forum/domain/entity/member/errors'

type Return = number
export type VoteCommentServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(VoteCommentCommand)
export class VoteCommentService extends CommentServiceBase<VoteCommentCommand, Return> {
  async executeImpl(command: VoteCommentCommand): Promise<Return> {
    const member = await this.memberRepo.findOneByUserId(command.userId)
    if (!member) throw new NotFoundException()

    if (member.isBanned) throw new MemberIsBannedError()

    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const comment = await this.commentRepo.findOneById(command.commentId)
    if (!comment) throw new NotFoundException()

    await this.postService.addVoteToComment(this.commentVoteRepo, comment, member, command.type)

    await this.commentRepo.save(comment)

    return comment.points
  }
}
