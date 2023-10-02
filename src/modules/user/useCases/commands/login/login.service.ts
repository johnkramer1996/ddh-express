import { inject, injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { LoginCommand } from './login.command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { USER_TYPES } from '@src/modules/user/infra/di/types'
import { UserTokensResponseDto } from '../../../dtos/user-tokens.response.dto'
import { AuthServicePort } from '@src/modules/user/services/auth.service.port'
import { PasswordDoesntMatchException } from '@src/modules/user/domain/user.errors'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserService } from '../../models/user.service.base'

export type Return = UserTokensResponseDto
export type LoginServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(LoginCommand)
export class LoginService extends UserService<LoginCommand, Return> {
  constructor(@inject(USER_TYPES.REPOSITORY) repository: UserRepositoryPort, @inject(USER_TYPES.AUTH_SERVICE) private authService: AuthServicePort) {
    super(repository)
  }

  async executeImpl(command: LoginCommand): Promise<Return> {
    const user = await this.repository.findOneByEmail(command.email)
    if (!user) throw new NotFoundException()

    const passwordValid = await user.comparePassword(command.password)
    if (!passwordValid) throw new PasswordDoesntMatchException()

    const JWTClaims = user.getJWTClaims()
    const accessToken = this.authService.signJWT(JWTClaims)

    const refreshToken = this.authService.createRefreshToken()

    user.setAccessToken(accessToken, refreshToken)

    await this.authService.saveAuthenticatedUser(user.email, accessToken, refreshToken)

    await this.repository.save(user)

    return { accessToken, refreshToken }
  }
}
