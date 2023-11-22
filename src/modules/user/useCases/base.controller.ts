import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController } from '@src/shared/infra/http/models/base.controller'
import { inject } from 'inversify'
import { UserMapper } from '../mappers/user/mapper-domain'
import { USER_TYPES } from '../di/user.types'
import { TYPES } from '@src/shared/di/types'
import { PasswordDoesntMatchException, UserAlreadyExistsError } from '../domain/user.errors'
import { Response } from 'express'
import { UserQueryMapper } from '../mappers/user/mapper-query'

export abstract class UserController extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(USER_TYPES.MAPPER) public mapper: UserMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    if (value instanceof PasswordDoesntMatchException) return this.clientError(res, value)
    if (value instanceof UserAlreadyExistsError) return this.clientError(res, value)
    return super.handleError(res, value)
  }
}

export abstract class UserControllerQueryBase extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) commandBus: ICommandBus,
    @inject(USER_TYPES.QUERY_MAPPER) public userMapper: UserQueryMapper
  ) {
    super(queryBus, commandBus)
  }

  protected handleError(res: Response, value: Error) {
    return super.handleError(res, value)
  }
}
