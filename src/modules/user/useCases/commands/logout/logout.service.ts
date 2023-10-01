import { inject, injectable } from 'inversify'
import { Result } from '../../../../../shared/core/result'
import { getStringFromUnknown } from '../../../../../shared/utils/get-error'
import { LogoutCommand } from './logout.command'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { USER_TYPES } from '@src/modules/user/infra/di/types'
import { AuthServicePort } from '@src/modules/user/services/auth.service.port'
import { UserNotFoundException } from '@src/modules/user/domain/user.errors'
import { CommandHandler, ICommandHandler } from '@src/shared/core/cqs/command-handler'

export type LogoutServiceResponse = Result<true> | Result<false, Error>

@injectable()
@CommandHandler(LogoutCommand)
export class LogoutService implements ICommandHandler<LogoutCommand, LogoutServiceResponse> {
  constructor(@inject(USER_TYPES.REPOSITORY) private repository: UserRepositoryPort, @inject(USER_TYPES.AUTH_SERVICE) private authService: AuthServicePort) {}

  async execute(command: LogoutCommand): Promise<LogoutServiceResponse> {
    try {
      const user = await this.repository.findOneById(command.id)
      if (!user) return Result.fail(new UserNotFoundException(command.id))

      await this.authService.deAuthenticateUser(user.email)

      return Result.ok<void>()
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
