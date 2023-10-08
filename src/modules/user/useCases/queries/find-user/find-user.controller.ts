import { injectable } from 'inversify'
import { FindUserQuery } from './find-user.query'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { UserIdRequestDto } from '@src/modules/user/dtos/user-id.request.dto'
import { UserController } from '@src/modules/user/useCases/base.controller'

@injectable()
@ControllerGet(routes.user.findOne)
export class FindUserController extends UserController {
  @ValidateRequest([['params', UserIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(UserIdRequestDto, req.params)

    const query = new FindUserQuery(params)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const user = result.getValue()

    return this.ok(res, this.mapper.toResponse(user))
  }
}
