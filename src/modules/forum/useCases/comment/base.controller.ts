import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController, RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'
import { inject } from 'inversify'
import { TYPES } from '@src/shared/di/types'
import { Response } from 'express'
import { PostMapper } from '../../mappers/post/mapper'
import { POST_TYPES } from '../../di/post/post.types'
import { COMMENT_TYPES } from '../../di/comment/comment.types'
import { CommentMapper } from '../../mappers/comment/mapper-domain'
import { CommentQueryMapper } from '../../mappers/comment/mapper-query'

export abstract class CommentControllerBase extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) commandBus: ICommandBus,
    @inject(COMMENT_TYPES.MAPPER) public commentMapper: CommentMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}

export abstract class CommentControllerQueryBase extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) commandBus: ICommandBus,
    @inject(COMMENT_TYPES.QUERY_MAPPER) public commentMapper: CommentQueryMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}
