import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CommentUpdateRequestDto } from './request.dto'
import { UpdateCommentCommand } from './command'
import { ControllerPatch, ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { CommentControllerBase } from '../../base.controller'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'
import { CommentIdRequestDto } from '@src/modules/forum/dtos/comment/id.request.dto'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'

@injectable()
@ControllerPatch(routes.postComments.updateById)
export class UpdateCommentController extends CommentControllerBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([
    ['body', CommentUpdateRequestDto],
    ['params', SlugRequestDto],
    ['params', CommentIdRequestDto],
  ])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(CommentUpdateRequestDto, req.body)
    const params = plainToClass(CommentIdRequestDto, req.params)
    const postParams = plainToClass(SlugRequestDto, req.params)
    const decoded = req.decoded

    const command = new UpdateCommentCommand({ ...params, ...postParams, ...body, userId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
