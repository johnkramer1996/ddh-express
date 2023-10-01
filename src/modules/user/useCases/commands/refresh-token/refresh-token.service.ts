import { inject, injectable } from 'inversify'
import { Result } from '../../../../../shared/core/result'
import { getStringFromUnknown } from '../../../../../shared/utils/get-error'
import { RefreshTokenCommand } from './refresh-token.command'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { USER_TYPES } from '@src/modules/user/infra/di/types'
import { AuthServicePort } from '@src/modules/user/services/auth.service.port'
import { UserNotFoundException } from '@src/modules/user/domain/user.errors'
import { CommandHandler, ICommandHandler } from '@src/shared/core/cqs/command-handler'
import { JWTToken } from '@src/modules/user/domain/jwt'

export type RefreshTokenServiceResponse = Result<true, JWTToken> | Result<false, Error>

@injectable()
@CommandHandler(RefreshTokenCommand)
export class RefreshTokenService implements ICommandHandler<RefreshTokenCommand, RefreshTokenServiceResponse> {
  constructor(@inject(USER_TYPES.REPOSITORY) private repository: UserRepositoryPort, @inject(USER_TYPES.AUTH_SERVICE) private authService: AuthServicePort) {}

  async execute(command: RefreshTokenCommand): Promise<RefreshTokenServiceResponse> {
    try {
      const email = await this.authService.getEmailFromRefreshToken(command.refreshToken)
      const user = await this.repository.findOneByEmail(email)
      if (!user) return Result.fail(new UserNotFoundException(email, 'email'))

      const accessToken = this.authService.signJWT({
        id: user.id,
        email: user.email,
      })

      const refreshToken = this.authService.createRefreshToken()

      user.setAccessToken(accessToken, refreshToken)

      await this.authService.saveAuthenticatedUser(user.email, accessToken, refreshToken)

      return Result.ok(accessToken)
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
