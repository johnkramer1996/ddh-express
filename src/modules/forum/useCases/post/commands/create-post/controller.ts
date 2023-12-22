import { injectable } from 'inversify'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CreatePostRequestDto } from './request.dto'
import { CreateOneCommand } from './command'
import { IdResponse } from '@src/shared/api/id.response.dto'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { PostControllerBase } from '../../base.controller'
import { ArgumentInvalidException, ForbiddenException } from '@src/shared/exceptions/exceptions'

@injectable()
@ControllerPost(routes.post.create)
export class CreatePostController extends PostControllerBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([['body', CreatePostRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const body = plainToClass(CreatePostRequestDto, req.body)
    const decoded = req.decoded
    const image = req.files?.image
    if (!image) return this.handleError(res, new ArgumentInvalidException('image is requred'))

    const command = new CreateOneCommand({ ...body, image, userId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const id = result.getValue()

    return this.created(res, new SlugResponse(id))
  }
}

// TODO: extends id
export class SlugResponse {
  constructor(public readonly slug: string) {}
}
