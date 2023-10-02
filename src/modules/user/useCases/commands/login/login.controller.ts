import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { LoginServiceResponse } from './login.service'
import { LoginRequestDto } from './login.request.dto'
import { LoginCommand } from './login.command'
import { ICommand } from '@src/shared/core/cqs/command.interface'
import { PasswordDoesntMatchException, UserNotFoundException } from '@src/modules/user/domain/user.errors'
import { UserTokensResponseDto } from '@src/modules/user/dtos/user-tokens.response.dto'
import { UserController } from '@src/modules/user/infra/models/user.controller'
import { routesV1 } from '@src/configs/routes'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'

@injectable()
@ControllerPost(routesV1.user.login)
export class LoginController extends UserController {
  @ValidateRequest([['body', LoginRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const request = plainToClass(LoginRequestDto, req.body)

    const command: ICommand<LoginServiceResponse> = new LoginCommand(request)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof UserNotFoundException) return this.notFound(res, value.message)
      if (value instanceof PasswordDoesntMatchException) return this.clientError(res, value.message)
      return this.fail(res, result.getValue())
    }

    const tokens = result.getValue()

    return this.created(res.cookie('accessToken', tokens.accessToken).cookie('refreshToken', tokens.refreshToken), new UserTokensResponseDto(tokens))
  }
}
