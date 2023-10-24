import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController, RequestDecoded, RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'
import { inject } from 'inversify'
import { TYPES } from '@src/shared/di/types'
import { Response } from 'express'
import { PostMapper } from '../../mappers/post/mapper'
import { POST_TYPES } from '../../di/post/post.types'

export abstract class PostControllerBase extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(POST_TYPES.MAPPER) public mapper: PostMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}
