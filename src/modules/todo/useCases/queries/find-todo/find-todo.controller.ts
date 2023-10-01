import { inject, injectable } from 'inversify'
import { FindTodoQuery } from './find-todo.query'
import { Request, Response } from 'express'
import { FindTodoServiceResponse } from './find-todo.service'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { BaseController } from '@src/shared/infra/http/models/controller.base'
import { TodoResponseDto } from '@src/modules/todo/dtos/todo.response.dto'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { TYPES } from '@src/shared/infra/di/types'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { TodoController } from '@src/modules/user/infra/models/user.controller'

@injectable()
export class FindTodoController extends TodoController {
  @ValidateRequest([['params', TodoIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(TodoIdRequestDto, req.params)

    const query: IQuery<FindTodoServiceResponse> = new FindTodoQuery(params)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof TodoNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    const todo = result.getValue()
    return this.ok(res, new TodoResponseDto(todo))
  }
}
