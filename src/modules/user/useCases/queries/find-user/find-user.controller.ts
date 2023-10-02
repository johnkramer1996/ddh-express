import { injectable } from 'inversify'
import { FindUserQuery } from './find-todo.query'
import { Request, Response } from 'express'
import { FindUserServiceResponse } from './find-todo.service'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { TodoResponseDto } from '@src/modules/todo/dtos/todo.response.dto'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routesV1 } from '@src/configs/routes'
import { UserIdRequestDto } from '@src/modules/user/dtos/user-id.request.dto'
import { UserResponseDto } from '@src/modules/user/dtos/user.response.dto'
import { UserController } from '@src/modules/user/infra/models/user.controller'
import { UserNotFoundException } from '@src/modules/user/domain/user.errors'

@injectable()
@ControllerGet(routesV1.user.findOne)
export class FindUserController extends UserController {
  @ValidateRequest([['params', UserIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(UserIdRequestDto, req.params)

    const query: IQuery<FindUserServiceResponse> = new FindUserQuery(params)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof UserNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    const user = result.getValue()

    return this.ok(res, this.mapper.toResponse(user))
  }
}
