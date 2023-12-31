import { injectable } from 'inversify'
import { FindMembersQuery } from './find-members.query'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { routes } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { MemberControllerQueryBase } from '../../member.base.controller'
import { MemberPaginatedResponseDto } from '@src/modules/forum/dtos/member/member.paginated.response.dto.ts'

@injectable()
@ControllerGet(routes.member.findAll)
export class FindMembersController extends MemberControllerQueryBase {
  @ValidateRequest([['query', PaginatedQueryRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(PaginatedQueryRequestDto, req.query)

    const query = new FindMembersQuery(params)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const paginated = result.getValue()

    return this.ok(
      res,
      new MemberPaginatedResponseDto({
        ...paginated,
        data: paginated.data.map(this.memberMapper.toResponse.bind(this.memberMapper)),
      })
    )
  }
}
