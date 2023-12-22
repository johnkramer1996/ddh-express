import { injectable } from 'inversify'
import { UpdatePostCommand } from './command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { PostServiceBase } from '../../base.service'
import { loadImage } from '@src/shared/utils/load-image'

type Return = void
export type UpdatePostServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(UpdatePostCommand)
export class UpdatePostService extends PostServiceBase<UpdatePostCommand, Return> {
  async executeImpl(command: UpdatePostCommand): Promise<Return> {
    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const member = await this.memberRepo.findOneByUserId(command.authUserId)
    if (!member) throw new NotFoundException()

    const fileName = command.image ? await loadImage(command.image) : undefined

    this.postService.updatePost(post, member, { ...command, image: fileName })

    await this.postRepo.save(post)
  }
}
