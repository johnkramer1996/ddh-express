import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { DeleteUserCommand } from './command'
import { ForbiddenException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserServiceBase } from '../../base.service'

type Return = void
export type DeleteUserServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(DeleteUserCommand)
export class UserDeleteService extends UserServiceBase<DeleteUserCommand, Return> {
  async executeImpl(command: DeleteUserCommand): Promise<Return> {
    const user = await this.userRepo.findOneById(command.userId)
    if (!user) throw new NotFoundException()

    const authUser = await this.userRepo.findOneById(command.authUserId)
    if (!authUser) throw new NotFoundException()

    if (!user.hasAccess(authUser)) throw new ForbiddenException()

    this.authService.deAuthenticateUser(user)

    // This layer also contains the triggering of Application Events, which represent some outcome of a use case
    user.delete()

    await this.userRepo.delete(user)
  }
}
