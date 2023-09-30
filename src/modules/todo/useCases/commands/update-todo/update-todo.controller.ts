import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../../shared/infra/di/types'
import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { UpdateTodoService } from './update-todo.service'
import { UpdateTodoRequestDto } from './update-todo.request.dto'
import { UpdateTodoCommand } from './update-todo.command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'

@injectable()
export class UpdateTodoController extends BaseController {
  constructor(@inject(TODO_TYPES.UPDATE_TODO_SERVICE) private service: UpdateTodoService) {
    super()
  }

  @ValidateRequest([
    ['body', UpdateTodoRequestDto],
    ['params', TodoIdRequestDto],
  ])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(UpdateTodoRequestDto, req.body)
    const params = plainToClass(TodoIdRequestDto, req.params)

    const command = new UpdateTodoCommand({ ...body, ...params })
    const result = await this.service.execute(command)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof TodoNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    return this.ok(res)
  }
}
