import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { DeleteCommentByIdCommand } from './delete-comment.command'
import { ControllerDelete } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { UserController } from '@src/modules/user/useCases/base.controller'
import { CommentIdRequestDto } from '@src/modules/forum/dtos/comment/comment.id.request.dto'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'

@injectable()
@ControllerDelete(routes.postComments.deleteById)
export class DeleteCommentByIdController extends UserController {
  @UseGuard(AuthGuard)
  @ValidateRequest([
    ['params', SlugRequestDto],
    ['params', CommentIdRequestDto],
  ])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const params = plainToClass(CommentIdRequestDto, req.params)
    const postParams = plainToClass(SlugRequestDto, req.params)
    const decoded = req.decoded

    const command = new DeleteCommentByIdCommand({ ...params, ...postParams, authUserId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
