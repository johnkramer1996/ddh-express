import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../../shared/infra/di/types'
import { Request, Response } from 'express'
import { BaseController, RequestDecoded } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { LogoutServiceResponse } from './logout.service'
import { LogoutCommand } from './logout.command'
import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UserNotFoundException } from '@src/modules/user/domain/user.errors'
import { UserRequestDto } from '@src/modules/user/dtos/user.request.dto'
import { UserController } from '@src/modules/user/infra/models/user.controller'

@injectable()
export class LogoutController extends UserController {
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const request = plainToClass(UserRequestDto, req.decoded)

    const command: ICommand<LogoutServiceResponse> = new LogoutCommand(request)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof UserNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    return this.ok(res)
  }
}
