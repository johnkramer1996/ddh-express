import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController } from '@src/shared/infra/http/models/base.controller'
import { inject } from 'inversify'
import { TYPES } from '@src/shared/di/types'
import { Response } from 'express'
import { POST_TYPES } from '../../di/post/post.types'
import { MemberMapper } from '../../mappers/member/mapper'
import { MEMBER_TYPES } from '../../di/member/types'

export abstract class MemberControllerBase extends BaseController {
  declare mapper: MemberMapper

  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(MEMBER_TYPES.MAPPER) mapper: MemberMapper
  ) {
    super(queryBus, commandBus, mapper)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}
