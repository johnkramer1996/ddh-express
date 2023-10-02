import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { DeleteTodoCommand } from './delete-todo.command'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { ControllerDelete } from '@src/shared/infra/http/decorators/controller'
import { routesV1 } from '@src/configs/routes'
import { TodoController } from '@src/modules/todo/infra/models/todo.controller'

@injectable()
@ControllerDelete(routesV1.todo.deleteOne)
export class DeleteTodoController extends TodoController {
  @ValidateRequest([['params', TodoIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(TodoIdRequestDto, req.params)

    const command = new DeleteTodoCommand(params)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
