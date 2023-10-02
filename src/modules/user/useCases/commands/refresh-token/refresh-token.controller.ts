import { injectable } from 'inversify'
import { Response } from 'express'
import { RequestDecoded } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { RefreshTokenCommand } from './refresh-token.command'
import { RefreshTokenRequestDto } from './refresh-token.request.dto'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { UserTokensResponseDto } from '@src/modules/user/dtos/user-tokens.response.dto'
import { UserController } from '@src/modules/user/infra/models/user.controller.base'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routesV1 } from '@src/configs/routes'

@injectable()
@ControllerPost(routesV1.user.refreshToken)
export class RefreshTokenController extends UserController {
  @ValidateRequest([['body', RefreshTokenRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const request = plainToClass(RefreshTokenRequestDto, req.body)

    const command = new RefreshTokenCommand(request)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const accessToken = result.getValue()
    const refreshToken = request.refreshToken

    res.cookie('accessToken', accessToken).cookie('refreshToken', refreshToken)
    return this.ok(res, new UserTokensResponseDto({ accessToken, refreshToken }))
  }
}
