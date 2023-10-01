import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { CreateTodoRequestDto } from './create-todo.request.dto'
import { CreateTodoCommand } from './create-todo.command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { TodoController } from '@src/modules/user/infra/models/user.controller'
import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateTodoServiceResponse } from './create-todo.service'

@injectable()
export class CreateTodoController extends TodoController {
  @ValidateRequest([['body', CreateTodoRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const request = plainToClass(CreateTodoRequestDto, req.body)

    const command: ICommand<CreateTodoServiceResponse> = new CreateTodoCommand(request)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) {
      return this.fail(res, result.getValue())
    }

    const id = result.getValue()

    return this.created(res, new IdResponse(id))
  }
}
