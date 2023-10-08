import { injectable } from 'inversify'
import { CommentDeleteOneCommand } from './command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { CommentServiceBase } from '../../base.service'
import { ResultWithError } from '@src/shared/core/result'

type Return = void
export type DeleteCommentServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CommentDeleteOneCommand)
export class CommentDeleteOneService extends CommentServiceBase<CommentDeleteOneCommand, Return> {
  async executeImpl(command: CommentDeleteOneCommand): Promise<Return> {
    const entity = await this.commentRepo.findOneById(command.commentId)
    if (!entity) throw new NotFoundException()

    entity.delete()

    await this.commentRepo.delete(entity)
  }
}
