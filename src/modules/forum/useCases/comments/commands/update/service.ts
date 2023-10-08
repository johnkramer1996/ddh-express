import { injectable } from 'inversify'
import { CommentUpdateCommand } from './command'
import { Text } from '@src/modules/todo/domain/value-objects/text.value-object'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { CommentServiceBase } from '../../base.service'
import { ResultWithError } from '@src/shared/core/result'

type Return = void
export type CommentUpdateServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CommentUpdateCommand)
export class UpdateTodoService extends CommentServiceBase<CommentUpdateCommand, Return> {
  async executeImpl(command: CommentUpdateCommand): Promise<Return> {
    const entity = await this.commentRepo.findOneById(command.todoId)
    if (!entity) throw new NotFoundException()

    if (command.text !== undefined) entity.updateText({ text: command.text })

    await this.commentRepo.save(entity)
  }
}
