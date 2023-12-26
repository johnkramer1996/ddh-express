import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController, RequestDecoded, RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'
import { inject } from 'inversify'
import { TYPES } from '@src/shared/di/types'
import { Response } from 'express'
import { PostMapper } from '../../mappers/post/mapper-domain'
import { POST_TYPES } from '../../di/post/post.types'
import { PostQueryMapper } from '../../mappers/post/mapper-query'

export abstract class PostControllerBase extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(POST_TYPES.MAPPER) public post: PostMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}

export abstract class PostControllerQueryBase extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) commandBus: ICommandBus,
    @inject(POST_TYPES.QUERY_MAPPER) public postMapper: PostQueryMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}
