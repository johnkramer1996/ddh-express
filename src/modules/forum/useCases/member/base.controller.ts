import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController } from '@src/shared/infra/http/models/base.controller'
import { inject } from 'inversify'
import { TYPES } from '@src/shared/di/types'
import { Response } from 'express'
import { MemberMapper } from '../../mappers/member/mapper-domain'
import { MEMBER_TYPES } from '../../di/member/types'
import { MemberQueryMapper } from '../../mappers/member/mapper-query'

export abstract class MemberControllerBase extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(MEMBER_TYPES.MAPPER) protected memberMapper: MemberMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}

export abstract class MemberControllerQueryBase extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) commandBus: ICommandBus,
    @inject(MEMBER_TYPES.QUERY_MAPPER) protected memberMapper: MemberQueryMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}
