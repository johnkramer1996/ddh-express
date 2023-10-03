import { inject, injectable } from 'inversify'
import { FindTodosQuery } from './find-todos.query'
import { FindTodosRequestDto } from './find-todos.request.dto'
import { Request, Response } from 'express'
import { FindTodosServiceResponse } from './find-todos.service'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { TodoPaginatedResponseDto } from '@src/modules/todo/dtos/todo.paginated.response.dto.ts'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { TodoController } from '@src/modules/todo/infra/models/todo.controller'
import { ControllerGet, ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'

@injectable()
@ControllerGet(routes.todo.findAll)
export class FindTodosController extends TodoController {
  @ValidateRequest([
    ['body', FindTodosRequestDto],
    ['query', PaginatedQueryRequestDto],
  ])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(FindTodosRequestDto, req.body)
    const params = plainToClass(PaginatedQueryRequestDto, req.query)

    const query = new FindTodosQuery({ where: { ...body }, ...params })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const paginated = result.getValue()

    return this.ok(
      res,
      new TodoPaginatedResponseDto({
        ...paginated,
        data: paginated.data.map(this.mapper.toResponse),
      })
    )
  }
}
