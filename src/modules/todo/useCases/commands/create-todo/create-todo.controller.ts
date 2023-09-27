import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../../shared/infra/di/types'
import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/http/models/controller.base'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/Validate'
import { CreateTodoService } from './create-todo.service'
import { CreateTodoRequestDto } from './create-todo.request.dto'
import { CreateTodoCommand } from './create-todo.command'
import { IdResponse } from '@src/shared/api/id.response.dto'

@injectable()
export class CreateTodoController extends BaseController {
  constructor(@inject(TYPES.CREATE_TODO_SERVICE) private service: CreateTodoService) {
    super()
  }

  @ValidateRequest([['body', CreateTodoRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const request = plainToClass(CreateTodoRequestDto, req.body)

    const command = new CreateTodoCommand(request)
    const result = await this.service.execute(command)

    if (!result.isSuccess) {
      return this.fail(res, result.getValue())
    }

    const id = result.getValue()

    return this.created(res, new IdResponse(id))
  }
}
