import { injectable } from 'inversify'
import { FindMessagesByLoginQuery as FindMessagesByLoginQuery } from './query'
import { Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { routes } from '@src/configs/routes'
import { ControllerGet } from '@src/shared/infra/http/decorators/controller'
import { AuthGuard, UseGuard } from '@src/shared/infra/http/decorators/useGuard'
import { RequestDecoded, RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'
import { LoginRequestDto } from '@src/modules/forum/dtos/login.request.dto'
import { MessageControllerQueryBase } from '../../base.controller'
import { MessagePaginatedResponseDto } from '@src/modules/forum/dtos/message.paginated.response.dto'
import { MessagePaginatedQueryRequestDto } from '@src/modules/forum/dtos/message/message.paginated-query.request.dto'

@injectable()
@ControllerGet(routes.cabinet.messagesByLogin)
export class FindMessagesByLoginController extends MessageControllerQueryBase {
  @UseGuard(AuthGuard)
  @ValidateRequest([
    ['params', LoginRequestDto],
    ['query', MessagePaginatedQueryRequestDto],
  ])
  async executeImpl(req: RequestDecoded, res: Response): Promise<any> {
    const params = plainToClass(LoginRequestDto, req.params)
    const queryRequest = plainToClass(MessagePaginatedQueryRequestDto, req.query)

    const decoded = req.decoded

    const query = new FindMessagesByLoginQuery({ ...params, ...queryRequest, authUserId: decoded.id })
    const result = await this.queryBus.execute(query)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    const paginated = result.getValue()

    return this.ok(
      res,
      new MessagePaginatedResponseDto({
        ...paginated,
        data: paginated.data.map(this.messageMapper.toResponse.bind(this.messageMapper)),
      })
    )
  }
}
