import { injectable } from 'inversify'
import { FindUserByLoginQuery } from './find-user-by-login.query'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { UserController, UserControllerQueryBase } from '@src/modules/user/useCases/user.base.controller'
import { UserLoginRequestDto } from '@src/modules/user/dtos/user.login.request.dto'

@injectable()
@ControllerGet(routes.user.findByLogin)
export class FindUserByLoginController extends UserControllerQueryBase {
  @ValidateRequest([['params', UserLoginRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(UserLoginRequestDto, req.params)

    const query = new FindUserByLoginQuery(params)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const user = result.getValue()

    return this.ok(res, this.userMapper.toResponse(user))
  }
}
