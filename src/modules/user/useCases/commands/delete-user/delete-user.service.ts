import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { DeleteUserCommand } from './delete-user.command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserService } from '../../models/user.service.base'

type Return = void
export type DeleteUserServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserService extends UserService<DeleteUserCommand, Return> {
  async executeImpl(command: DeleteUserCommand): Promise<Return> {
    const user = await this.postRepo.findOneById(command.todoId)
    if (!user) throw new NotFoundException()

    user.delete()

    await this.postRepo.delete(user)
  }
}
