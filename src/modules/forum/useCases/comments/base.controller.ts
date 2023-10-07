import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController } from '@src/shared/infra/http/models/controller.base'
import { inject } from 'inversify'
import { TYPES } from '@src/shared/di/types'
import { Response } from 'express'
import { PostMapper } from '../../mappers/post.mapper'
import { COMMENT_TYPES, POST_TYPES } from '../../di/types'
import { CommentMapper } from '../../mappers/comment.mapper'

export abstract class CommentControllerBase extends BaseController {
  declare mapper: CommentMapper

  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(COMMENT_TYPES.MAPPER) mapper: CommentMapper
  ) {
    super(queryBus, commandBus, mapper)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}
