import { injectable } from 'inversify'
import { FindMemberByLoginQuery } from './query'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { LoginRequestDto } from '@src/modules/forum/dtos/login.request.dto'
import { MemberControllerQueryBase } from '../../base.controller'

@injectable()
@ControllerGet(routes.member.findByLogin)
export class FindMemberByLoginController extends MemberControllerQueryBase {
  @ValidateRequest([['params', LoginRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(LoginRequestDto, req.params)

    const query = new FindMemberByLoginQuery(params)
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const member = result.getValue()

    return this.ok(res, this.memberMapper.toResponse(member))
  }
}
