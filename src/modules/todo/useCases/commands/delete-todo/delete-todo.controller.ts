import { inject, injectable } from 'inversify'
import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { DeleteTodoService } from './delete-todo.service'
import { DeleteTodoCommand } from './delete-todo.command'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'

@injectable()
export class DeleteTodoController extends BaseController {
  constructor(@inject(TODO_TYPES.DELETE_TODO_SERVICE) private service: DeleteTodoService) {
    super()
  }

  @ValidateRequest([['params', TodoIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(TodoIdRequestDto, req.params)

    const command = new DeleteTodoCommand(params)
    const result = await this.service.execute(command)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof TodoNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    return this.ok(res)
  }
}
