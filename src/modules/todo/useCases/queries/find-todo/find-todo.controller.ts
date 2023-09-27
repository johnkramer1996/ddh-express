import { inject, injectable } from 'inversify'
import { FindTodoQuery } from './find-todo.query'
import { Request, Response } from 'express'
import { FindTodoService } from './find-todo.service'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/Validate'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { BaseController } from '@src/shared/infra/http/models/controller.base'
import { TYPES } from '@src/shared/infra/di/types'
import { TodoResponseDto } from '@src/modules/todo/dtos/todo.response.dto'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'

@injectable()
export class FindTodoController extends BaseController {
  constructor(@inject(TYPES.FIND_TODO_SERVICE) private service: FindTodoService) {
    super()
  }

  @ValidateRequest([['params', TodoIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(TodoIdRequestDto, req.params)

    const query = new FindTodoQuery(params)
    const result = await this.service.execute(query)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof TodoNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    const todo = result.getValue()
    return this.ok(res, new TodoResponseDto(todo))
  }
}
