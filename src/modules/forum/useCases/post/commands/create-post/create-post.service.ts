import { injectable } from 'inversify'
import { CreatePostCommand as CreatePostCommand } from './create-post.command'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { PostServiceBase } from '../../post.base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { loadImage } from '@src/shared/utils/load-image'
import { MemberIsBannedError } from '@src/modules/forum/domain/entity/member/member.errors'

type Return = AggregateID
export type CreatePostServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CreatePostCommand)
export class CreatePostService extends PostServiceBase<CreatePostCommand, Return> {
  async executeImpl(command: CreatePostCommand): Promise<Return> {
    const member = await this.memberRepo.findOneByUserId(command.authUserId)
    if (!member) throw new NotFoundException()

    if (member.isBanned) throw new MemberIsBannedError()

    const fileName = await loadImage(command.image)

    const post = await this.postService.createPost(this.postRepo, member, {
      ...command,
      image: fileName,
    })

    await this.postRepo.save(post)

    return post.slug
  }
}
