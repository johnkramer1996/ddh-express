import { inject, injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { LogoutCommand } from './logout.command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { USER_TYPES } from '@src/modules/user/di/types'
import { AuthServicePort } from '@src/modules/user/services/auth.service.port'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserService } from '../../base.service'

export type Return = void
export type LogoutServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(LogoutCommand)
export class LogoutService extends UserService<LogoutCommand, Return> {
  constructor(@inject(USER_TYPES.REPOSITORY) repository: UserRepositoryPort, @inject(USER_TYPES.AUTH_SERVICE) private authService: AuthServicePort) {
    super(repository)
  }

  async executeImpl(command: LogoutCommand): Promise<Return> {
    const user = await this.commentRepo.findOneById(command.id)
    if (!user) throw new NotFoundException()

    await this.authService.deAuthenticateUser(user.email)
  }
}
