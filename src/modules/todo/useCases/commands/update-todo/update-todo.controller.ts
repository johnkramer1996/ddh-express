import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { UpdateTodoServiceResponse } from './update-todo.service'
import { UpdateTodoRequestDto } from './update-todo.request.dto'
import { UpdateTodoCommand } from './update-todo.command'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { TodoController } from '@src/modules/user/infra/models/user.controller'
import { ICommand } from '@src/shared/core/cqs/command.interface'

@injectable()
export class UpdateTodoController extends TodoController {
  @ValidateRequest([
    ['body', UpdateTodoRequestDto],
    ['params', TodoIdRequestDto],
  ])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(UpdateTodoRequestDto, req.body)
    const params = plainToClass(TodoIdRequestDto, req.params)

    const command: ICommand<UpdateTodoServiceResponse> = new UpdateTodoCommand({ ...body, ...params })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof TodoNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    return this.ok(res)
  }
}
