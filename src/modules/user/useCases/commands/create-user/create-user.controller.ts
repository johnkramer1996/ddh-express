import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CreateUserRequestDto } from './create-user.request.dto'
import { CreateUserCommand } from './create-user.command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateUserServiceResponse } from './create-user.service'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { ArgumentOutOfRangeException } from '@src/shared/exceptions/exceptions'
import { UserController } from '@src/modules/user/useCases/base.controller'

@injectable()
@ControllerPost(routes.user.createOne)
export class CreateUserController extends UserController {
  @ValidateRequest([['body', CreateUserRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const request = plainToClass(CreateUserRequestDto, req.body)

    const command = new CreateUserCommand(request)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const id = result.getValue()

    return this.created(res, new IdResponse(id))
  }
}
