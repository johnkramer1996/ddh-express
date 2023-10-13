import { injectable } from 'inversify'
import { CreateOneCommand } from './command'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { PostEntity } from '@src/modules/forum/domain/entity/post/entity'
import { PostType } from '@src/modules/forum/domain/entity/post/types'
import { Slug } from '@src/modules/forum/domain/value-objects/slug.value-object'
import { PostServiceBase } from '../../base.service'

type Return = AggregateID
export type CreateOneServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CreateOneCommand)
export class CreateOneService extends PostServiceBase<CreateOneCommand, Return> {
  async executeImpl(command: CreateOneCommand): Promise<Return> {
    const post = PostEntity.create({
      memberId: command.userId,
      title: command.title,
      type: command.type,
      text: command.type === PostType.text ? command.text : null,
      link: command.type === PostType.text ? null : command.link,
      slug: Slug.create({ value: command.title }),
    })

    await this.postRepo.save(post)

    return post.id
  }
}
