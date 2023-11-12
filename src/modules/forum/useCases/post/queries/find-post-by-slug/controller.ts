import { injectable } from 'inversify'
import { FindPostBySlugQuery } from './query'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'
import { PostControllerBase } from '../../base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { UserRequestDto } from '@src/modules/user/dtos/user.request.dto'
import { RequestDecoded, RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'

@injectable()
@ControllerGet(routes.post.findBySlug)
export class FindPostBySlugController extends PostControllerBase {
  @UseGuard(AuthGuard, false)
  @ValidateRequest([['params', SlugRequestDto]])
  async executeImpl(req: RequestDecodedIfExist, res: Response): Promise<any> {
    const params = plainToClass(SlugRequestDto, req.params)
    const decoded = req.decoded

    const query = new FindPostBySlugQuery({ ...params, userId: decoded?.id })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const item = result.getValue()

    return this.ok(res, item)
  }
}
