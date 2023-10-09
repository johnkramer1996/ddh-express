import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { RecoverUserCommand } from './command'
import { ControllerPatch } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { UserController } from '@src/modules/user/useCases/base.controller'
import { UserIdRequestDto } from '@src/modules/user/dtos/user-id.request.dto'

@injectable()
@ControllerPatch(routes.user.recoverById)
export class RecoverUserController extends UserController {
  @ValidateRequest([['params', UserIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(UserIdRequestDto, req.params)

    const command = new RecoverUserCommand({ userId: params.userId })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
