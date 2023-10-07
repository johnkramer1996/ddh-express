import { injectable } from 'inversify'
import { FindBySlugQuery } from './find-by-slug.query'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'
import { PostControllerBase } from '../../base.controller'

@injectable()
@ControllerGet(routes.post.findOneBySlug)
export class FindBySlugController extends PostControllerBase {
  @ValidateRequest([['params', SlugRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(SlugRequestDto, req.params)

    const query = new FindBySlugQuery(params)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const item = result.getValue()

    return this.ok(res, this.mapper.toResponse(item))
  }
}
