import { injectable } from 'inversify'
import { CurrentUserQuery } from './current-user.query'
import { UserRequestDto } from '../../../dtos/user.request.dto'
import { Response } from 'express'
import { CurrentUserServiceResponse } from './current-user.service'
import { plainToClass } from 'class-transformer'
import { RequestDecoded } from '@src/shared/infra/http/models/controller.base'
import { IQuery } from '@src/shared/core/cqs/query.interface'
import { UserNotFoundException } from '@src/modules/user/domain/user.errors'
import { UserController } from '@src/modules/user/infra/models/user.controller'
import { routesV1 } from '@src/configs/routes'
import { ControllerGet, ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'

@injectable()
@ControllerGet(routesV1.user.currentUser)
export class CurrentUserController extends UserController {
  @UseGuard(AuthGuard)
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(UserRequestDto, req.decoded)

    const query: IQuery<CurrentUserServiceResponse> = new CurrentUserQuery(body)
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
