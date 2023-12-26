import { injectable } from 'inversify'
import { VoteCommand } from './command'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { PostServiceBase } from '../../base.service'
import { MemberIsBannedError } from '@src/modules/forum/domain/entity/member/errors'

type Return = number
export type VotePostServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(VoteCommand)
export class VotePostService extends PostServiceBase<VoteCommand, Return> {
  async executeImpl(command: VoteCommand): Promise<Return> {
    const member = await this.memberRepo.findOneByUserId(command.userId)
    if (!member) throw new NotFoundException()

    if (member.isBanned) throw new MemberIsBannedError()

    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    await this.postService.addVoteToPost(this.postVoteRepo, post, member, command.type)

    await this.postRepo.save(post)

    return post.points
  }
}
