import { injectable } from 'inversify'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { AddRoleToMemberCommand } from './attach-or-detach-role-to-member.command'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { LoginRequestDto } from '@src/modules/forum/dtos/login.request.dto'
import { MemberControllerBase } from '../../member.base.controller'
import { AddRoleToMemberRequestDto } from './attach-or-detach-role-to-member.request.dto'

@injectable()
@ControllerPost(routes.member.attachRoleByLogin)
@ControllerPost(routes.member.detachRoleByLogin)
export class AddRoleToMemberController extends MemberControllerBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([
    ['params', LoginRequestDto],
    ['body', AddRoleToMemberRequestDto],
  ])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const action = req.url.split('/').pop() as 'attachRole' | 'detachRole'
    const params = plainToClass(LoginRequestDto, req.params)
    const body = plainToClass(AddRoleToMemberRequestDto, req.body)
    const decoded = req.decoded

    const command = new AddRoleToMemberCommand({ action, ...params, ...body, authUserId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
