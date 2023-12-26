import { injectable } from 'inversify'
import { Response } from 'express'
import { UpdateLastActiveMemberCommand } from './command'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { MemberControllerBase } from '../../base.controller'

@injectable()
@ControllerPost(routes.cabinet.updateLastActiveMember)
export class UpdateLastActiveMemberController extends MemberControllerBase {
  @UseGuard(AuthGuard)
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const decoded = req.decoded

    const command = new UpdateLastActiveMemberCommand({ authUserId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
