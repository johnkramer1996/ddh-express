import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { DeleteUserCommand } from './delete-user-by-login.command'
import { ForbiddenException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserServiceBase } from '../../user.base.service'

type Return = void
export type DeleteUserServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserService extends UserServiceBase<DeleteUserCommand, Return> {
  async executeImpl(command: DeleteUserCommand): Promise<Return> {
    const user = await this.userRepo.findOneById(command.userId)
    if (!user) throw new NotFoundException()

    const authUser = await this.userRepo.findOneById(command.authUserId)
    if (!authUser) throw new NotFoundException()

    user.delete(authUser)

    this.authService.deAuthenticateUser(user)

    await this.userRepo.delete(user)
  }
}
