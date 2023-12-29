import { injectable } from 'inversify'
import { Response } from 'express'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { FindMembersForMessageByAuthUserQuery } from './find-members-for-message-by-auth-user.query'
import { MessageControllerQueryBase } from '../../../message/base.controller'

@injectable()
@ControllerGet(routes.cabinet.membersForMessage)
export class FindMembersForMessageByAuthUserController extends MessageControllerQueryBase {
  @UseGuard(AuthGuard)
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const decoded = req.decoded

    const query = new FindMembersForMessageByAuthUserQuery({ authUserId: decoded.id })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const members = result.getValue()

    return this.ok(res, members.map(this.memberMapper.toResponse.bind(this.memberMapper)))
  }
}
