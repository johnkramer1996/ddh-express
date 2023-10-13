import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController, RequestDecodedIfExist } from '@src/shared/infra/http/models/base.controller'
import { inject } from 'inversify'
import { TYPES } from '@src/shared/di/types'
import { Response } from 'express'
import { PostMapper } from '../../mappers/post/mapper'
import { POST_TYPES } from '../../di/post/post.types'
import { COMMENT_TYPES } from '../../di/comment/comment.types'
import { CommentMapper } from '../../mappers/comment/mapper'

export abstract class CommentControllerBase extends BaseController {
  declare mapper: CommentMapper

  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(COMMENT_TYPES.MAPPER) mapper: CommentMapper
  ) {
    super(queryBus, commandBus, mapper)
  }

  protected getResponseMapper(req: RequestDecodedIfExist) {
    return req.decoded ? this.mapper.toResponseDetail.bind(this.mapper) : this.mapper.toResponse.bind(this.mapper)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}
