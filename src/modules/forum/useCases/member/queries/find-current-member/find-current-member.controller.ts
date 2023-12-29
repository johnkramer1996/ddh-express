import { injectable } from 'inversify'
import { Response } from 'express'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { MemberControllerQueryBase } from '../../member.base.controller'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { FindMemberByLoginQuery } from '../find-member-by-login/find-member-by-login.query'

@injectable()
@ControllerGet(routes.cabinet.member)
export class FindCurrentMemberController extends MemberControllerQueryBase {
  @UseGuard(AuthGuard)
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const decoded = req.decoded

    const query = new FindMemberByLoginQuery(decoded)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const member = result.getValue()

    return this.ok(res, this.memberMapper.toResponse(member))
  }
}
