import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { LoginRequestDto } from './login.request.dto'
import { LoginCommand } from './login.command'
import { UserTokensResponseDto } from '@src/modules/user/dtos/user.tokens.response.dto'
import { UserController } from '@src/modules/user/useCases/user.base.controller'
import { routes } from '@src/configs/routes'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'

@injectable()
@ControllerPost(routes.user.login)
export class LoginController extends UserController {
  @ValidateRequest([['body', LoginRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(LoginRequestDto, req.body)

    const command = new LoginCommand(body)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const tokens = result.getValue()

    res.cookie('accessToken', tokens.accessToken).cookie('refreshToken', tokens.refreshToken)
    return this.created(res, new UserTokensResponseDto(tokens))
  }
}
