import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController } from '@src/shared/infra/http/models/controller.base'
import { inject } from 'inversify'
import { UserMapper } from '../../domain/user.mapper'
import { USER_TYPES } from '../di/types'
import { TYPES } from '@src/shared/di/types'
import { PasswordDoesntMatchException } from '../../domain/user.errors'
import { Response } from 'express'

export abstract class UserController extends BaseController {
  declare mapper: UserMapper

  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(USER_TYPES.MAPPER) mapper: UserMapper
  ) {
    super(queryBus, commandBus, mapper)
  }

  protected handleError(res: Response, value: Error) {
    if (value instanceof PasswordDoesntMatchException) return this.clientError(res, value.message)
    return super.handleError(res, value)
  }
}
