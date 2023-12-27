import { injectable } from 'inversify'
import { ModeratePostCommand } from './command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { PostServiceBase } from '../../base.service'

type Return = void
export type ModeratePostServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(ModeratePostCommand)
export class ModeratePostService extends PostServiceBase<ModeratePostCommand, Return> {
  async executeImpl(command: ModeratePostCommand): Promise<Return> {
    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const member = await this.memberRepo.findOneByUserId(command.authUserId)
    if (!member) throw new NotFoundException()

    post.updateStatus(command.status)

    await this.postRepo.save(post)
  }
}
