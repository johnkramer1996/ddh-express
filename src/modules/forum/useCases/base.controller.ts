import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController } from '@src/shared/infra/http/models/controller.base'
import { inject } from 'inversify'
import { TYPES } from '@src/shared/di/types'
import { Response } from 'express'
import { PostMapper } from '../mappers/post.mapper'
import { POST_TYPES } from '../di/types'

export abstract class PostControllerBase extends BaseController {
  declare mapper: PostMapper

  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(POST_TYPES.MAPPER) mapper: PostMapper
  ) {
    super(queryBus, commandBus, mapper)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}
