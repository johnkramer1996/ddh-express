import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { DeleteUserCommand } from './delete-user.command'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { ControllerDelete } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { UserController } from '@src/modules/user/useCases/base.controller'

@injectable()
@ControllerDelete(routes.user.deleteOne)
export class DeleteUserController extends UserController {
  @ValidateRequest([['params', TodoIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(TodoIdRequestDto, req.params)

    const command = new DeleteUserCommand(params)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
