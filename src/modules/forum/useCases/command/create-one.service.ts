import { injectable } from 'inversify'
import { CreateOneCommand } from './create-one.command'
import { Text } from '@src/modules/todo/domain/value-objects/text.value-object'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { PostService } from '../service.base'
import { PostEntity } from '../../domain/post.entity'
import { Slug } from '../../domain/value-objects/slug.value-object'
import { PostType } from '../../domain/post.types'

type Return = AggregateID
export type CreateOneServiceResponse = ResultWithError<AggregateID>

@injectable()
@CommandHandler(CreateOneCommand)
export class CreateOneService extends PostService<CreateOneCommand, Return> {
  async executeImpl(command: CreateOneCommand): Promise<Return> {
    const post = PostEntity.create({
      userId: command.userId,
      title: command.title,
      type: command.type,
      text: command.type === PostType.text ? command.text : null,
      link: command.type === PostType.link ? command.link : null,
      slug: Slug.create({ value: command.title }),
    })

    await this.repository.save(post)

    return post.id
  }
}
