import { injectable } from 'inversify'
import { Response } from 'express'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { PostControllerQueryBase } from '../../base.controller'
import { RequestDecoded } from '@src/shared/infra/http/models/base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { FindPostsByAuthUserQuery } from './query'
import { plainToClass } from 'class-transformer'
import { FindPostByAuthUserPaginatedQueryRequestDto } from '@src/modules/forum/useCases/post/queries/find-posts-by-auth-user/request.dto'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { PostPaginatedResponseDto } from '@src/modules/forum/dtos/post/post.paginated.response.dto'

@injectable()
@ControllerGet(routes.cabinet.posts)
export class FindPostsByAuthUserController extends PostControllerQueryBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([['query', FindPostByAuthUserPaginatedQueryRequestDto]])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const query = plainToClass(FindPostByAuthUserPaginatedQueryRequestDto, req.query)
    const decoded = req.decoded

    const postQuery = new FindPostsByAuthUserQuery({ ...query, authUserId: decoded.id })
    const result = await this.queryBus.execute(postQuery)

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
