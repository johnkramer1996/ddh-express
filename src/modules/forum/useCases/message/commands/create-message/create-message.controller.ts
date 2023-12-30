import { injectable } from 'inversify'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CreateMessageRequestDto } from './create-message.request.dto'
import { CreateMessageCommand } from './create-message.command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { MessageControllerBase } from '../../message.base.controller'

@injectable()
@ControllerPost(routes.message.create)
export class CreateMessageController extends MessageControllerBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([['body', CreateMessageRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(CreateMessageRequestDto, req.body)
    const decoded = req.decoded

    const command = new CreateMessageCommand({ ...body, userId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const id = result.getValue()

    return this.created(res, new IdResponse(id))
  }
}
