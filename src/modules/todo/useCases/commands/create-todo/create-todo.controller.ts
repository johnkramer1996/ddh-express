import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../../shared/infra/di/types'
import { TodoPaginatedResponseDto } from '../../../dtos/todo.paginated.response.dto.ts'
import { ResponseBase } from '../../../../../shared/api/response.base'
import { PaginatedQueryRequestDto } from '../../../../../shared/api/paginated-query.request.dto'
import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/Validate'
import { CreateTodoService } from './create-todo.service'
import { CreateTodoRequestDto } from './create-todo.request.dto'
import { CreateUserCommand } from './create-todo.command'
import { IdResponse } from '@src/shared/api/id.response.dto'

@injectable()
export class CreateTodoController extends BaseController {
  constructor(@inject(TYPES.CREATE_TODO_SERVICE) private service: CreateTodoService) {
    super()
  }

  @ValidateRequest([['body', CreateTodoRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const request = plainToClass(CreateTodoRequestDto, req.body)

    const query = new CreateUserCommand(request)
    const result = await this.service.execute(query)

    if (!result.isSuccess) {
      return this.fail(res, result.getValue())
    }

    const id = result.getValue()

    return this.created(res, new IdResponse(id))
  }
}
