import { injectable } from 'inversify'
import { CurrentUserQuery } from './find-current-user.query'
import { UserRequestDto } from '../../../dtos/user.request.dto'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { UserController, UserControllerQueryBase } from '@src/modules/user/useCases/user.base.controller'
import { routes } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'

@injectable()
@ControllerGet(routes.user.currentUser)
@ControllerGet(routes.cabinet.user)
export class CurrentUserController extends UserControllerQueryBase {
  @UseGuard(AuthGuard)
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const decoded = req.decoded

    const query = new CurrentUserQuery({ userId: decoded.id })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const user = result.getValue()

    return this.ok(res, this.userMapper.toResponse(user))
  }
}
