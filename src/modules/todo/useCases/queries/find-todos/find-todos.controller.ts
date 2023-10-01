import { inject, injectable } from 'inversify'
import { FindTodosQuery } from './find-todos.query'
import { FindTodosRequestDto } from './find-todos.request.dto'
import { Request, Response } from 'express'
import { FindTodosServiceResponse } from './find-todos.service'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { TodoPaginatedResponseDto } from '@src/modules/todo/dtos/todo.paginated.response.dto.ts'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { TodoController } from '@src/modules/user/infra/models/user.controller'

@injectable()
export class FindTodosController extends TodoController {
  @ValidateRequest([
    ['body', FindTodosRequestDto],
    ['query', PaginatedQueryRequestDto],
  ])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(FindTodosRequestDto, req.body)
    const params = plainToClass(PaginatedQueryRequestDto, req.query)

    const query: IQuery<FindTodosServiceResponse> = new FindTodosQuery({ where: { ...body }, ...params })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) {
      return this.fail(res, result.getValue())
    }

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
