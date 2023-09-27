import { inject, injectable } from 'inversify'
import { FindTodosQuery } from './find-todos.query'
import { FindTodosRequestDto } from './find-todos.request.dto'
import { Request, Response } from 'express'
import { FindTodosService } from './find-todos.service'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/Validate'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { BaseController } from '@src/shared/infra/http/models/controller.base'
import { TYPES } from '@src/shared/infra/di/types'
import { TodoPaginatedResponseDto } from '@src/modules/todo/dtos/todo.paginated.response.dto.ts'

@injectable()
export class FindTodosController extends BaseController {
  constructor(@inject(TYPES.FIND_TODOS_SERVICE) private service: FindTodosService) {
    super()
  }

  @ValidateRequest([
    ['body', FindTodosRequestDto],
    ['query', PaginatedQueryRequestDto],
  ])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(FindTodosRequestDto, req.body)
    const params = plainToClass(PaginatedQueryRequestDto, req.query)

    const query = new FindTodosQuery({ where: { ...body }, ...params })
    const result = await this.service.execute(query)

    if (!result.isSuccess) {
      return this.fail(res, result.getValue())
    }

    const paginated = result.getValue()

    return this.ok(res, new TodoPaginatedResponseDto(paginated))
  }
}
