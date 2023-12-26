import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController, RequestDecoded, RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'
import { inject } from 'inversify'
import { TYPES } from '@src/shared/di/types'
import { Response } from 'express'
import { PostMapper } from '../../mappers/post/mapper-domain'
import { MessageQueryMapper } from '../../mappers/message/mapper-query'
import { MESSAGE_TYPES } from '../../di/message/types'
import { MEMBER_TYPES } from '../../di/member/types'
import { MemberQueryMapper } from '../../mappers/member/mapper-query'

export abstract class MessageControllerBase extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(MESSAGE_TYPES.MAPPER) public messageMapper: PostMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}

export abstract class MessageControllerQueryBase extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) commandBus: ICommandBus,
    @inject(MESSAGE_TYPES.QUERY_MAPPER) public messageMapper: MessageQueryMapper,
    @inject(MEMBER_TYPES.QUERY_MAPPER) public memberMapper: MemberQueryMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}
