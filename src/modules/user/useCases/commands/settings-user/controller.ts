import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { SettingsUserRequestDto } from './request.dto'
import { SettingsUserCommand } from './command'
import { ControllerPatch, ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { UserControllerQueryBase } from '../../base.controller'

@injectable()
@ControllerPatch(routes.user.update)
@ControllerPatch(routes.cabinet.settings)
export class SettingsUserController extends UserControllerQueryBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([['body', SettingsUserRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(SettingsUserRequestDto, req.body)
    const decoded = req.decoded
    const avatar = req.files?.avatar

    // TODO: DELETE AVATAR
    const command = new SettingsUserCommand({ ...body, deleteAvatar: Boolean(body.avatar), avatar, authUserId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
