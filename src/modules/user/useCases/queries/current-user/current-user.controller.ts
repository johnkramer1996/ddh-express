import { inject, injectable } from 'inversify'
import { CurrentUserQuery } from './current-user.query'
import { CurrentUserRequestDto } from './current-user.request.dto'
import { Request, Response } from 'express'
import { CurrentUserServiceResponse } from './find-users.service'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { BaseController, RequestDecoded } from '@src/shared/infra/http/models/controller.base'
import { UserPaginatedResponseDto } from '@src/modules/user/dtos/user.paginated.response.dto.ts'
import { TYPES } from '@src/shared/infra/di/types'
import { QueryBus } from '@src/shared/core/cqs/query-bus'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { UserNotFoundException } from '@src/modules/user/domain/user.errors'
import { UserResponseDto } from '@src/modules/user/dtos/user.response.dto'

@injectable()
export class CurrentUserController extends BaseController {
  constructor(@inject(TYPES.QUERY_BUS) private queryBus: QueryBus) {
    super()
  }

  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(CurrentUserRequestDto, req.decoded)

    const query: IQuery<CurrentUserServiceResponse> = new CurrentUserQuery(body)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) {
      const value = result.getValue()
      if (value instanceof UserNotFoundException) return this.notFound(res, value.message)
      return this.fail(res, result.getValue())
    }

    const user = result.getValue()

    return this.ok(res, new UserResponseDto(user))
  }
}
