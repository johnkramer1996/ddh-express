import { inject, injectable } from 'inversify'
import { Result } from '../../../../../shared/core/result'
import { getStringFromUnknown } from '../../../../../shared/utils/get-error'
import { LoginCommand } from './login.command'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { USER_TYPES } from '@src/modules/user/infra/di/types'
import { UserTokensResponseDto } from '../../../dtos/user-tokens.response.dto'
import { AuthServicePort } from '@src/modules/user/services/auth.service.port'
import { PasswordDoesntMatchException, UserNotFoundException } from '@src/modules/user/domain/user.errors'
import { CommandHandler, ICommandHandler } from '@src/shared/core/cqs/command-handler'

export type LoginServiceResponse = Result<true, UserTokensResponseDto> | Result<false, Error>

@injectable()
@CommandHandler(LoginCommand)
export class LoginService implements ICommandHandler<LoginCommand, LoginServiceResponse> {
  constructor(@inject(USER_TYPES.REPOSITORY) private repository: UserRepositoryPort, @inject(USER_TYPES.AUTH_SERVICE) private authService: AuthServicePort) {}

  async execute(command: LoginCommand): Promise<LoginServiceResponse> {
    try {
      const user = await this.repository.findOneByEmail(command.email)
      if (!user) return Result.fail(new UserNotFoundException(command.email))

      if (!(user.password === command.password)) return Result.fail(new PasswordDoesntMatchException())

      const accessToken = this.authService.signJWT({
        id: user.id,
        email: user.email,
      })

      const refreshToken = this.authService.createRefreshToken()

      user.setAccessToken(accessToken, refreshToken)

      await this.authService.saveAuthenticatedUser(user.email, accessToken, refreshToken)

      await this.repository.save(user)

      return Result.ok({ accessToken, refreshToken })
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
