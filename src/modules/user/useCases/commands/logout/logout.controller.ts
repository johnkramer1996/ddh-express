import { injectable } from 'inversify'
import { Response } from 'express'
import { RequestDecoded } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { LogoutCommand } from './logout.command'
import { UserRequestDto } from '@src/modules/user/dtos/user.request.dto'
import { UserController } from '@src/modules/user/useCases/base.controller'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'

@injectable()
@ControllerPost(routes.user.logout)
export class LogoutController extends UserController {
  @UseGuard(AuthGuard)
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const decoded = plainToClass(UserRequestDto, req.decoded)

    const command = new LogoutCommand(decoded)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
