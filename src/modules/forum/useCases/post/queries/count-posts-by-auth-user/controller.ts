import { injectable } from 'inversify'
import { Response } from 'express'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { PostControllerQueryBase } from '../../post.base.controller'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { CountPostsByStatusQuery } from './query'

@injectable()
@ControllerGet(routes.cabinet.countPosts)
export class CountPostsByAuthUserController extends PostControllerQueryBase {
  @UseGuard(AuthGuard)
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const decoded = req.decoded

    const query = new CountPostsByStatusQuery({ authUserId: decoded.id })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const data = result.getValue()

    return this.ok(res, data)
  }
}
