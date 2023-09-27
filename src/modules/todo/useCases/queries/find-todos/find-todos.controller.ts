import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../../shared/infra/di/types'
import { TodoPaginatedResponseDto } from '../../../dtos/todo.paginated.response.dto.ts'
import { ResponseBase } from '../../../../../shared/api/response.base'
import { FindTodosQuery } from './find-todos.query'
import { FindTodosRequestDto } from './find-todos.request.dto'
import { PaginatedQueryRequestDto } from '../../../../../shared/api/paginated-query.request.dto'
import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/http/models/controller.base'
import { FindTodosService } from './find-todos.service'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/Validate'

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
    const request = plainToClass(FindTodosRequestDto, req.body)
    const queryParams = plainToClass(PaginatedQueryRequestDto, req.query)

    const query = new FindTodosQuery({ where: { ...request }, ...queryParams })
    const result = await this.service.execute(query)

    if (!result.isSuccess) {
      return this.fail(res, result.getValue())
    }

    const paginated = result.getValue()

    return this.ok(res, new TodoPaginatedResponseDto(paginated))
  }
}
