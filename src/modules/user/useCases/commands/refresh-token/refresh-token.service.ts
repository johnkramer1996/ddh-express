import { inject, injectable } from 'inversify'
import { Result, ResultWithError } from '../../../../../shared/core/result'
import { RefreshTokenCommand } from './refresh-token.command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { USER_TYPES } from '@src/modules/user/infra/di/types'
import { AuthServicePort } from '@src/modules/user/services/auth.service.port'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { JWTToken } from '@src/shared/core/jwt'
import { UserService } from '../../models/user.service.base'

type Return = JWTToken
export type RefreshTokenServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(RefreshTokenCommand)
export class RefreshTokenService extends UserService<RefreshTokenCommand, Return> {
  constructor(@inject(USER_TYPES.REPOSITORY) repository: UserRepositoryPort, @inject(USER_TYPES.AUTH_SERVICE) private authService: AuthServicePort) {
    super(repository)
  }
  async executeImpl(command: RefreshTokenCommand): Promise<Return> {
    const email = await this.authService.getEmailFromRefreshToken(command.refreshToken)
    const user = await this.postRepo.findOneByEmail(email)
    if (!user) throw new NotFoundException()

    const accessToken = this.authService.signJWT({
      id: user.id,
      email: user.email,
    })

    const refreshToken = this.authService.createRefreshToken()

    user.setAccessToken(accessToken, refreshToken)

    await this.authService.saveAuthenticatedUser(user.email, accessToken, refreshToken)

    return accessToken
  }
}
