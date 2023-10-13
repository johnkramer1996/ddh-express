import { injectable } from 'inversify'
import { PostFindAllByLoginQuery } from './query'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { routes } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { PostPaginatedResponseDto } from '@src/modules/forum/dtos/paginated.response.dto.ts'
import { PostControllerBase } from '@src/modules/forum/useCases/post/base.controller'
import { PostPaginatedQueryRequestDto } from '@src/modules/forum/dtos/paginated-query.request.dto'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'
import { LoginRequestDto } from '@src/modules/forum/dtos/login.request.dto'

@injectable()
@ControllerGet(routes.member.posts)
export class PostFindAllByLoginController extends PostControllerBase {
  @UseGuard(AuthGuard, false)
  @ValidateRequest([['query', PostPaginatedQueryRequestDto]])
  @ValidateRequest([['params', LoginRequestDto]])
  async executeImpl(req: RequestDecodedIfExist, res: Response): Promise<any> {
    const query = plainToClass(PostPaginatedQueryRequestDto, req.query)
    const params = plainToClass(LoginRequestDto, req.params)
    const decoded = req.decoded

    const postQuery = new PostFindAllByLoginQuery({ ...query, ...params, authMemberId: decoded?.id })
    const result = await this.queryBus.execute(postQuery)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const paginated = result.getValue()

    return this.ok(
      res,
      new PostPaginatedResponseDto({
        ...paginated,
        data: paginated.data.map(this.getResponseMapper(req)),
      })
    )
  }
}
