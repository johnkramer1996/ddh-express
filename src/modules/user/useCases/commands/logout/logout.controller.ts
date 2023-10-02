import { injectable } from 'inversify'
import { Response } from 'express'
import { RequestDecoded } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { LogoutServiceResponse } from './logout.service'
import { LogoutCommand } from './logout.command'
import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UserNotFoundException } from '@src/modules/user/domain/user.errors'
import { UserRequestDto } from '@src/modules/user/dtos/user.request.dto'
import { UserController } from '@src/modules/user/infra/models/user.controller'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routesV1, userUrls } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'

@injectable()
@ControllerPost(routesV1.user.logout)
export class LogoutController extends UserController {
  @UseGuard(AuthGuard)
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
