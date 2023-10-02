import { injectable } from 'inversify'
import { FindTodoQuery } from './find-todo.query'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { TodoController } from '@src/modules/todo/infra/models/todo.controller'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routesV1 } from '@src/configs/routes'

@injectable()
@ControllerGet(routesV1.todo.findOne)
export class FindTodoController extends TodoController {
  @ValidateRequest([['params', TodoIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(TodoIdRequestDto, req.params)

    const query = new FindTodoQuery(params)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const todo = result.getValue()

    return this.ok(res, this.mapper.toResponse(todo))
  }
}
