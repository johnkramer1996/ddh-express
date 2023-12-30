import { injectable } from 'inversify'
import { DeletePostCommand } from './delete-post.command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { PostServiceBase } from '../../post.base.service'
import { ResultWithError } from '@src/shared/core/result'

type Return = void
export type DeletePostServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(DeletePostCommand)
export class DeletePostService extends PostServiceBase<DeletePostCommand, Return> {
  async executeImpl(command: DeletePostCommand): Promise<Return> {
    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const member = await this.memberRepo.findOneByUserId(command.authUserId)
    if (!member) throw new NotFoundException()

    await this.postRepo.delete(post)
  }
}
