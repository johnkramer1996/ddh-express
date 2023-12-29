import { injectable } from 'inversify'
import { FindAllChildrenCommentByIdQuery } from './find-all-children-comment-by-id.query'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'
import { CommentControllerQueryBase } from '../../comment.base.controller'
import { CommentIdRequestDto } from '@src/modules/forum/dtos/comment/comment.id.request.dto'

@injectable()
@ControllerGet(routes.postComments.findAllChildrenById)
export class FindAllChildrenCommentByIdController extends CommentControllerQueryBase {
  @UseGuard(AuthGuard, false)
  @ValidateRequest([['params', CommentIdRequestDto]])
  async executeImpl(req: RequestDecodedIfExist, res: Response): Promise<any> {
    const params = plainToClass(CommentIdRequestDto, req.params)
    const decoded = req.decoded

    const query = new FindAllChildrenCommentByIdQuery({ ...params, userId: decoded?.id })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const items = result.getValue()

    return this.ok(res, items.map(this.commentMapper.toResponse.bind(this.commentMapper)))
  }
}
