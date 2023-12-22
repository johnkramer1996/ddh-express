import { injectable } from 'inversify'
import { CreateOneCommand as CreatePostCommand } from './command'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { PostEntity } from '@src/modules/forum/domain/entity/post/entity'
import { PostType } from '@src/modules/forum/domain/entity/post/types'
import { Slug } from '@src/modules/forum/domain/value-objects/slug.value-object'
import { PostServiceBase } from '../../base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { loadImage } from '@src/shared/utils/load-image'

type Return = AggregateID
export type CreateOneServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CreatePostCommand)
export class CreatePostService extends PostServiceBase<CreatePostCommand, Return> {
  async executeImpl(command: CreatePostCommand): Promise<Return> {
    const member = await this.memberRepo.findOneByUserId(command.userId)
    if (!member) throw new NotFoundException()

    const fileName = await loadImage(command.image)

    const post = PostEntity.create({
      memberId: member.id,
      type: command.type,
      image: fileName,
      title: command.title,
      text: command.type === PostType.text ? command.text : null,
      link: command.type === PostType.text ? null : command.link,
      slug: Slug.create({ value: command.title }),
    })

    await this.postRepo.save(post)

    return post.slug
  }
}
