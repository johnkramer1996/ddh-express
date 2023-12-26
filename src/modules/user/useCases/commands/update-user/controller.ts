import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { UpdateUserRequestDto } from './request.dto'
import { UpdateUserCommand } from './command'
import { ControllerPatch, ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { UserControllerQueryBase } from '../../base.controller'

@injectable()
@ControllerPatch(routes.user.update)
@ControllerPatch(routes.cabinet.settings)
export class UpdateUserController extends UserControllerQueryBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([['body', UpdateUserRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(UpdateUserRequestDto, req.body)
    const decoded = req.decoded
    const avatar = req.files?.avatar

    const command = new UpdateUserCommand({ ...body, deleteAvatar: Boolean(body.avatar), avatar, authUserId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
