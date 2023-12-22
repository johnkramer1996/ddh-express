import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { PostUpdateRequestDto } from './request.dto'
import { UpdatePostCommand } from './command'
import { ControllerPatch, ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { PostControllerBase } from '../../base.controller'

@injectable()
@ControllerPatch(routes.post.updateBySlug)
export class UpdatePostController extends PostControllerBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([
    ['body', PostUpdateRequestDto],
    ['params', SlugRequestDto],
  ])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(PostUpdateRequestDto, req.body)
    const params = plainToClass(SlugRequestDto, req.params)
    const decoded = req.decoded
    const image = req.files?.image

    const command = new UpdatePostCommand({ ...params, ...body, image, authUserId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
