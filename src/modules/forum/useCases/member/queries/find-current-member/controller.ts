import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { LoginRequestDto } from '@src/modules/forum/dtos/login.request.dto'
import { MemberControllerBase } from '../../base.controller'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { FindMemberByLoginQuery } from '../find-member-by-login/query'

@injectable()
@ControllerGet(routes.member.currentMember)
export class FindCurrentMemberController extends MemberControllerBase {
  @UseGuard(AuthGuard)
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const decoded = req.decoded

    const query = new FindMemberByLoginQuery(decoded)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const member = result.getValue()

    return this.ok(res, this.mapper.toResponse(member))
  }
}
