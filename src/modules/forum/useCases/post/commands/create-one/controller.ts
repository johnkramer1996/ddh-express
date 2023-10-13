import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CreateOneRequestDto } from './request.dto'
import { CreateOneCommand } from './command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { UserRequestDto } from '@src/modules/user/dtos/user.request.dto'
import { PostControllerBase } from '../../base.controller'

@injectable()
@ControllerPost(routes.post.create)
export class PostCreateOneController extends PostControllerBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([['body', CreateOneRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(CreateOneRequestDto, req.body)
    const decoded = plainToClass(UserRequestDto, req.decoded)

    const command = new CreateOneCommand({ ...body, userId: decoded.userId })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const id = result.getValue()

    return this.created(res, new IdResponse(id))
  }
}
