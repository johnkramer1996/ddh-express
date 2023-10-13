import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CreateUserRequestDto } from './request.dto'
import { UserCreateCommand } from './command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { UserController } from '@src/modules/user/useCases/base.controller'

@injectable()
@ControllerPost(routes.user.create)
export class CreateUserController extends UserController {
  @ValidateRequest([['body', CreateUserRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(CreateUserRequestDto, req.body)

    const command = new UserCreateCommand(body)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const id = result.getValue()

    return this.created(res, new IdResponse(id))
  }
}
