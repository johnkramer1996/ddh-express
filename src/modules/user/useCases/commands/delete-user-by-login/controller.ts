import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { DeleteUserCommand } from './command'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { ControllerDelete } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { UserController } from '@src/modules/user/useCases/base.controller'
import { UserIdRequestDto } from '@src/modules/user/dtos/user-id.request.dto'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { UserLoginRequestDto } from '@src/modules/user/dtos/user-login.request.dto'

@injectable()
@ControllerDelete(routes.user.deleteByLogin)
export class DeleteUserController extends UserController {
  @UseGuard(AuthGuard)
  @ValidateRequest([['params', UserLoginRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const params = plainToClass(UserLoginRequestDto, req.params)
    const decoded = req.decoded

    const command = new DeleteUserCommand({ userId: params.login, authUserId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
