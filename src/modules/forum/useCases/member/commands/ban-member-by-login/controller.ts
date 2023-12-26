import { injectable } from 'inversify'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { BanMemberCommand } from './command'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, AdminGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { LoginRequestDto } from '@src/modules/forum/dtos/login.request.dto'
import { MemberControllerBase } from '../../base.controller'

@injectable()
@ControllerPost(routes.member.banByLogin)
@ControllerPost(routes.member.recoverByLogin)
export class BanMemberController extends MemberControllerBase {
  @UseGuard(AuthGuard)
  @UseGuard(AdminGuard)
  @ValidateRequest([['params', LoginRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const params = plainToClass(LoginRequestDto, req.params)
    const decoded = req.decoded
    const action = req.url.split('/').pop()?.toLowerCase() as 'ban' | 'recover'

    const command = new BanMemberCommand({ login: params.login, authUserId: decoded.id, action })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
