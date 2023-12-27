import { injectable } from 'inversify'
import { FindPostsQuery } from './query'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { routes } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { PostControllerQueryBase } from '@src/modules/forum/useCases/post/base.controller'
import { PostPaginatedQueryRequestDto } from '@src/modules/forum/dtos/post/post.paginated-query.request.dto'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'
import { PostPaginatedResponseDto } from '@src/modules/forum/dtos/post/post.paginated.response.dto'
import { FindPostsRequestDto } from './request.dto'

@injectable()
@ControllerGet(routes.post.findAll)
export class FindPostsController extends PostControllerQueryBase {
  @UseGuard(AuthGuard, false)
  @ValidateRequest([
    ['query', PostPaginatedQueryRequestDto],
    ['body', FindPostsRequestDto],
  ])
  async executeImpl(req: RequestDecodedIfExist, res: Response): Promise<any> {
    const params = plainToClass(PostPaginatedQueryRequestDto, req.query)
    const body = plainToClass(FindPostsRequestDto, req.body)
    const decoded = req.decoded

    const query = new FindPostsQuery({ ...params, ...body, userId: decoded?.id })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const paginated = result.getValue()

    return this.ok(
      res,
      new PostPaginatedResponseDto({
        ...paginated,
        data: paginated.data.map(this.postMapper.toResponse.bind(this.postMapper)),
      })
    )
  }
}
