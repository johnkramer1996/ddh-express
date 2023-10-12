import { injectable } from 'inversify'
import { CommentFindAllQuery } from './query'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { routes } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { CommentControllerBase } from '../../base.controller'
import { CommentPaginatedResponseDto } from '@src/modules/forum/dtos/comment/paginated.response.dto.ts'
import { SlugRequestDto } from '@src/modules/forum/dtos/slug.request.dto'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'

@injectable()
@ControllerGet(routes.postComments.findAll)
export class CommentFindAllController extends CommentControllerBase {
  @ValidateRequest([
    ['params', SlugRequestDto],
    ['query', PaginatedQueryRequestDto],
  ])
  @UseGuard(AuthGuard, false)
  async executeImpl(req: RequestDecodedIfExist, res: Response): Promise<any> {
    const params = plainToClass(SlugRequestDto, req.params)
    const paginatedQuery = plainToClass(PaginatedQueryRequestDto, req.query)
    const decoded = req.decoded

    const query = new CommentFindAllQuery({ ...params, ...paginatedQuery, userId: decoded?.id })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const paginated = result.getValue()

    return this.ok(
      res,
      new CommentPaginatedResponseDto({
        ...paginated,
        data: paginated.data.map(this.getResponseMapper(req)),
      })
    )
  }
}
