import { injectable } from 'inversify'
import { FindPostsByLoginQuery } from './query'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { routes } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { PostControllerQueryBase } from '@src/modules/forum/useCases/post/base.controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'
import { LoginRequestDto } from '@src/modules/forum/dtos/login.request.dto'
import { PostPaginatedResponseDto } from '@src/modules/forum/dtos/post/post.paginated.response.dto'
import { FindPostsByLoginPaginatedQueryRequestDto } from './request.dto'

@injectable()
@ControllerGet(routes.member.findPostsByLogin)
export class FindPostsByLoginController extends PostControllerQueryBase {
  @UseGuard(AuthGuard, false)
  @ValidateRequest([['query', FindPostsByLoginPaginatedQueryRequestDto]])
  @ValidateRequest([['params', LoginRequestDto]])
  async executeImpl(req: RequestDecodedIfExist, res: Response): Promise<any> {
    const queryRequest = plainToClass(FindPostsByLoginPaginatedQueryRequestDto, req.query)
    const params = plainToClass(LoginRequestDto, req.params)
    const decoded = req.decoded

    const query = new FindPostsByLoginQuery({ ...queryRequest, ...params, userId: decoded?.id })
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
