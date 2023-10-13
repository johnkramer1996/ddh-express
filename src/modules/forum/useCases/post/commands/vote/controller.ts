import { injectable } from 'inversify'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { VoteCommand } from './command'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { UserRequestDto } from '@src/modules/user/dtos/user.request.dto'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'
import { VoteType } from '@src/modules/forum/domain/entity/vote.base.entity'
import { PostControllerBase } from '../../base.controller'

@injectable()
@ControllerPost(routes.post.upvoteBySlug)
@ControllerPost(routes.post.downvoteBySlug)
export class PostVoteController extends PostControllerBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([['params', SlugRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const params = plainToClass(SlugRequestDto, req.params)
    const type = req.url.split('/').pop()?.toLowerCase() as VoteType
    const decoded = req.decoded

    const command = new VoteCommand({ ...params, type, userId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const points = result.getValue()

    return this.ok(res, { points })
  }
}
