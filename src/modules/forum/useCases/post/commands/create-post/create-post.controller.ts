import { injectable } from 'inversify'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CreatePostRequestDto } from './create-post.request.dto'
import { CreatePostCommand } from './create-post.command'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { PostControllerBase } from '../../post.base.controller'
import { ArgumentInvalidException } from '@src/shared/exceptions/exceptions'
import { SlugResponse } from '@src/modules/forum/dtos/slug.response.dto'

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

    const command = new CreatePostCommand({ ...body, image, authUserId: decoded.id })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const slug = result.getValue()

    return this.created(res, new SlugResponse(slug))
  }
}
