import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { UpdateTodoRequestDto } from './update-todo.request.dto'
import { UpdateTodoCommand } from './update-todo.command'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { TodoController } from '@src/modules/todo/infra/models/todo.controller'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routesV1 } from '@src/configs/routes'

@injectable()
@ControllerPost(routesV1.todo.updateOne)
export class UpdateTodoController extends TodoController {
  @ValidateRequest([
    ['body', UpdateTodoRequestDto],
    ['params', TodoIdRequestDto],
  ])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(UpdateTodoRequestDto, req.body)
    const params = plainToClass(TodoIdRequestDto, req.params)

    const command = new UpdateTodoCommand({ ...body, ...params })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
