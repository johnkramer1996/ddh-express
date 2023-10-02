import { injectable } from 'inversify'
import { CurrentUserQuery } from './current-user.query'
import { UserRequestDto } from '../../../dtos/user.request.dto'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { RequestDecoded } from '@src/shared/infra/http/models/controller.base'
import { UserController } from '@src/modules/user/infra/models/user.controller.base'
import { routesV1 } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'

@injectable()
@ControllerGet(routesV1.user.currentUser)
export class CurrentUserController extends UserController {
  @UseGuard(AuthGuard)
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(UserRequestDto, req.decoded)

    const query = new CurrentUserQuery(body)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const user = result.getValue()

    return this.ok(res, this.mapper.toResponse(user))
  }
}
