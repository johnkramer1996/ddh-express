import { injectable } from 'inversify'
import { FindPostsQuery } from './find-all.query'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { routes } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { PostPaginatedResponseDto } from '@src/modules/forum/dtos/paginated.response.dto.ts'
import { PostController } from '@src/modules/forum/useCases/controller.base'
import { FindAllPaginatedQueryRequestDto } from '@src/modules/forum/dtos/paginated-query.request.dto'

@injectable()
@ControllerGet(routes.post.findAll)
export class FindPostsController extends PostController {
  @ValidateRequest([['query', FindAllPaginatedQueryRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(FindAllPaginatedQueryRequestDto, req.query)
    const query = new FindPostsQuery(params)
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
