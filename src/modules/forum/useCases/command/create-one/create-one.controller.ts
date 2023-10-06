import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CreateOneRequestDto } from './create-one.request.dto'
import { CreateOneCommand } from './create-one.command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/controller.base'
import { UserRequestDto } from '@src/modules/user/dtos/user.request.dto'
import { PostController } from '../../controller.base'

@injectable()
@ControllerPost(routes.post.createOne)
export class CreateOneController extends PostController {
  @UseGuard(AuthGuard)
  @ValidateRequest([['body', CreateOneRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(CreateOneRequestDto, req.body)
    const decoded = plainToClass(UserRequestDto, req.decoded)

    const command = new CreateOneCommand({ ...body, userId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const id = result.getValue()

    return this.created(res, new IdResponse(id))
  }
}
