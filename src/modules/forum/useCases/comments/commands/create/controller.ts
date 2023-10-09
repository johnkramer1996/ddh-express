import { injectable } from 'inversify'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CommentCreateRequestDto } from './request.dto'
import { CommentCreateCommand } from './command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { CommentControllerBase } from '../../base.controller'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'

@injectable()
@ControllerPost(routes.postComments.create)
export class CommentCreateController extends CommentControllerBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([
    ['params', SlugRequestDto],
    ['body', CommentCreateRequestDto],
  ])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const params = plainToClass(SlugRequestDto, req.params)
    const body = plainToClass(CommentCreateRequestDto, req.body)
    const decoded = req.decoded

    const command = new CommentCreateCommand({ ...params, ...body, userId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const id = result.getValue()

    return this.created(res, new IdResponse(id))
  }
}
