import { injectable } from 'inversify'
import { FindUsersQuery } from './find-users.query'
import { FindUsersRequestDto } from './find-users.request.dto'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { UserPaginatedResponseDto } from '@src/modules/user/dtos/user.paginated.response.dto.ts'
import { UserController } from '@src/modules/user/infra/models/user.controller.base'
import { routes } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'

@injectable()
@ControllerGet(routes.user.findAll)
export class FindUsersController extends UserController {
  @ValidateRequest([
    ['body', FindUsersRequestDto],
    ['query', PaginatedQueryRequestDto],
  ])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(FindUsersRequestDto, req.body)
    const params = plainToClass(PaginatedQueryRequestDto, req.query)

    const query = new FindUsersQuery(params)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const paginated = result.getValue()

    return this.ok(
      res,
      new UserPaginatedResponseDto({
        ...paginated,
        data: paginated.data.map(this.mapper.toResponse),
      })
    )
  }
}
