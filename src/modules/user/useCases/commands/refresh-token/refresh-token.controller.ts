import { injectable } from 'inversify'
import { Response } from 'express'
import { BaseController, RequestDecoded } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { RefreshTokenServiceResponse } from './refresh-token.service'
import { RefreshTokenCommand } from './refresh-token.command'
import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UserNotFoundException } from '@src/modules/user/domain/user.errors'
import { RefreshTokenRequestDto } from './refresh-token.request.dto'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { UserTokensResponseDto } from '@src/modules/user/dtos/user-tokens.response.dto'
import { UserController } from '@src/modules/user/infra/models/user.controller'

@injectable()
export class RefreshTokenController extends UserController {
  @ValidateRequest([['body', RefreshTokenRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const request = plainToClass(RefreshTokenRequestDto, req.body)

    const command: ICommand<RefreshTokenServiceResponse> = new RefreshTokenCommand(request)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof UserNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    const accessToken = result.getValue()
    const refreshToken = request.refreshToken

    return this.ok(res.cookie('accessToken', accessToken).cookie('refreshToken', refreshToken), new UserTokensResponseDto({ accessToken, refreshToken }))
  }
}
