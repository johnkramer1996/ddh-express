import { inject, injectable } from 'inversify'
import { Result, ResultWithError } from '../../../../../shared/core/result'
import { RefreshTokenCommand } from './command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { USER_TYPES } from '@src/modules/user/di/user.types'
import { AuthServicePort } from '@src/modules/user/services/auth.service.port'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { JWTToken } from '@src/shared/core/jwt'
import { UserService } from '../../base.service'

type Return = JWTToken
export type RefreshTokenServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(RefreshTokenCommand)
export class RefreshTokenService extends UserService<RefreshTokenCommand, Return> {
  async executeImpl(command: RefreshTokenCommand): Promise<Return> {
    const login = await this.authService.getLoginFromRefreshToken(command.refreshToken)
    const user = await this.userRepo.findOneByLogin(login)
    if (!user) throw new NotFoundException()

    const accessToken = this.authService.signJWT(user)

    const refreshToken = this.authService.createRefreshToken()

    user.setAccessToken(accessToken, refreshToken)

    await this.authService.saveAuthenticatedUser(user)

    return accessToken
  }
}
