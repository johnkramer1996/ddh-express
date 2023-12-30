import { injectable } from 'inversify'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { VoteCommentCommand } from './vote-comment.command'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { UserRequestDto } from '@src/modules/user/dtos/user.request.dto'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'
import { VoteType } from '@src/modules/forum/domain/entity/vote.base.entity'
import { PostControllerBase } from '../../../post/post.base.controller'
import { CommentIdRequestDto } from '@src/modules/forum/dtos/comment/comment.id.request.dto'

@injectable()
@ControllerPost(routes.postComments.upvote)
@ControllerPost(routes.postComments.downvote)
export class VoteCommentController extends PostControllerBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([
    ['params', SlugRequestDto],
    ['params', CommentIdRequestDto],
  ])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const postParams = plainToClass(SlugRequestDto, req.params)
    const params = plainToClass(CommentIdRequestDto, req.params)
    const type = req.url.split('/').pop()?.toLowerCase() as VoteType
    const decoded = req.decoded

    const command = new VoteCommentCommand({ ...params, ...postParams, type, userId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const points = result.getValue()

    return this.ok(res, { points })
  }
}
