import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { LogoutCommand } from './command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserServiceBase } from '../../base.service'

export type Return = void
export type LogoutServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(LogoutCommand)
export class LogoutService extends UserServiceBase<LogoutCommand, Return> {
  async executeImpl(command: LogoutCommand): Promise<Return> {
    const user = await this.userRepo.findOneById(command.id)
    if (!user) throw new NotFoundException()

    await this.authService.deAuthenticateUser(user)
  }
}
