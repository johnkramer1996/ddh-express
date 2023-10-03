import { injectable } from 'inversify'
import { CreateOneCommand } from './create-one.command'
import { Text } from '@src/modules/todo/domain/value-objects/text.value-object'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { PostService } from '../service.base'
import { PostEntity } from '../../domain/post.entity'

type Return = AggregateID
export type CreateOneServiceResponse = ResultWithError<AggregateID>

@injectable()
@CommandHandler(CreateOneCommand)
export class CreateOneService extends PostService<CreateOneCommand, Return> {
  async executeImpl(command: CreateOneCommand): Promise<Return> {
    // const post = PostEntity.create({
    //   title: command.title,
    // })

    // await this.repository.save(post)

    return 'post.id'
  }
}
