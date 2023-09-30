import { inject, injectable } from 'inversify'
import { FindUsersQuery } from './find-users.query'
import { FindUsersRequestDto } from './find-users.request.dto'
import { Request, Response } from 'express'
import { FindUsersServiceResponse } from './find-users.service'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/utils/validate-request'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { BaseController } from '@src/shared/infra/http/models/controller.base'
import { UserPaginatedResponseDto } from '@src/modules/user/dtos/user.paginated.response.dto.ts'
import { TYPES } from '@src/shared/infra/di/types'
import { QueryBus } from '@src/shared/core/cqs/query-bus'
import { IQuery } from '@src/shared/core/cqs/query.interface'

@injectable()
export class FindUsersController extends BaseController {
  constructor(@inject(TYPES.QUERY_BUS) private queryBus: QueryBus) {
    super()
  }

  @ValidateRequest([
    ['body', FindUsersRequestDto],
    ['query', PaginatedQueryRequestDto],
  ])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(FindUsersRequestDto, req.body)
    const params = plainToClass(PaginatedQueryRequestDto, req.query)

    const query: IQuery<FindUsersServiceResponse> = new FindUsersQuery({ where: { ...body }, ...params })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) {
      return this.fail(res, result.getValue())
    }

    const paginated = result.getValue()

    return this.ok(res, new UserPaginatedResponseDto(paginated))
  }
}
