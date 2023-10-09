import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { DeleteUserCommand } from './command'
import { ForbiddenException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserService } from '../../base.service'

type Return = void
export type DeleteUserServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(DeleteUserCommand)
export class UserDeleteService extends UserService<DeleteUserCommand, Return> {
  async executeImpl(command: DeleteUserCommand): Promise<Return> {
    const deleteUser = await this.userRepo.findOneById(command.deleteUserId)
    if (!deleteUser) throw new NotFoundException()

    const user = await this.userRepo.findOneById(command.userId)
    if (!user) throw new NotFoundException()

    if (!deleteUser.hasAccess(user)) throw new ForbiddenException()

    this.authService.deAuthenticateUser(deleteUser)

    deleteUser.delete()

    await this.userRepo.delete(deleteUser)
  }
}
