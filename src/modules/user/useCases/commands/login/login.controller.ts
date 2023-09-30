import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../../shared/infra/di/types'
import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { LoginService, LoginServiceResponse } from './login.service'
import { LoginRequestDto } from './login.request.dto'
import { LoginCommand } from './login.command'
import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UserNotFoundException } from '@src/modules/user/domain/user.errors'

@injectable()
export class LoginController extends BaseController {
  constructor(@inject(TYPES.COMMAND_BUS) private commandBus: ICommandBus) {
    super()
  }

  @ValidateRequest([['body', LoginRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const request = plainToClass(LoginRequestDto, req.body)

    const command: ICommand<LoginServiceResponse> = new LoginCommand(request)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof UserNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    const tokens = result.getValue()

    return this.created(res.cookie('accessToken', tokens.accessToken).cookie('refreshToken', tokens.refreshToken), tokens)
  }
}
