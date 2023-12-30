import { injectable } from 'inversify'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { UpdateMessageRequestDto } from './update-message.request.dto'
import { UpdateMessageCommand } from './update-message.command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { ControllerPatch, ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { MessageControllerBase } from '../../message.base.controller'
import { CommentIdRequestDto } from '@src/modules/forum/dtos/comment/comment.id.request.dto'
import { MessageIdRequestDto } from '@src/modules/forum/dtos/message/message.id.request.dto'

@injectable()
@ControllerPatch(routes.message.updateById)
export class UpdateMessageController extends MessageControllerBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([
    ['body', UpdateMessageRequestDto],
    ['params', MessageIdRequestDto],
  ])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(UpdateMessageRequestDto, req.body)
    const params = plainToClass(MessageIdRequestDto, req.params)
    const decoded = req.decoded

    const command = new UpdateMessageCommand({ ...body, ...params, userId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
