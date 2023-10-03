import { injectable } from 'inversify'
import { FindPostsQuery } from './find-all.query'
import { FindPostsRequestDto } from './find-all.request.dto'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { routesV1 } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { PostPaginatedResponseDto } from '@src/modules/forum/dtos/paginated.response.dto.ts'
import { PostsController } from '@src/modules/forum/useCases/controller.base'

@injectable()
@ControllerGet(routesV1.post.findAll)
export class FindPostsController extends PostsController {
  @ValidateRequest([
    ['body', FindPostsRequestDto],
    ['query', PaginatedQueryRequestDto],
  ])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(FindPostsRequestDto, req.body)
    const params = plainToClass(PaginatedQueryRequestDto, req.query)

    const query = new FindPostsQuery({ where: { ...body }, ...params })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const paginated = result.getValue()

    return this.ok(
      res,
      new PostPaginatedResponseDto({
        ...paginated,
        data: paginated.data.map(this.mapper.toResponse),
      })
    )
  }
}
