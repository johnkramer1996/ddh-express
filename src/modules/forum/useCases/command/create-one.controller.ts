import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CreateOneRequestDto } from './create-one.request.dto'
import { CreateOneCommand } from './create-one.command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { TodoController } from '@src/modules/todo/infra/models/todo.controller'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routesV1 } from '@src/configs/routes'

@injectable()
@ControllerPost(routesV1.post.createOne)
export class CreateOneController extends TodoController {
  @ValidateRequest([['body', CreateOneRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const request = plainToClass(CreateOneRequestDto, req.body)

    const command = new CreateOneCommand(request)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const id = result.getValue()

    return this.created(res, new IdResponse(id))
  }
}
