import { inject, injectable } from 'inversify'
import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { DeleteTodoService, DeleteTodoServiceResponse } from './delete-todo.service'
import { DeleteTodoCommand } from './delete-todo.command'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'
import { ICommand } from '@src/shared/core/cqs/command.interface'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routesV1 } from '@src/configs/routes'
import { TodoController } from '@src/modules/user/infra/models/user.controller'

@injectable()
@ControllerPost(routesV1.todo.deleteOne)
export class DeleteTodoController extends TodoController {
  @ValidateRequest([['params', TodoIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(TodoIdRequestDto, req.params)

    const command: ICommand<DeleteTodoServiceResponse> = new DeleteTodoCommand(params)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof TodoNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    return this.ok(res)
  }
}
