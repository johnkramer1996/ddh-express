import { TodoMapper } from '@src/modules/todo/domain/todo.mapper'
import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController } from '@src/shared/infra/http/models/controller.base'
import { inject } from 'inversify'
import { UserMapper } from '../../domain/user.mapper'
import { USER_TYPES } from '../di/types'
import { TYPES } from '@src/shared/infra/di/types'

export abstract class UserController extends BaseController {
  declare mapper: UserMapper

  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(USER_TYPES.MAPPER) mapper: UserMapper
  ) {
    super(queryBus, commandBus, mapper)
  }
}

export abstract class TodoController extends BaseController {
  declare mapper: TodoMapper

  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(USER_TYPES.MAPPER) mapper: TodoMapper
  ) {
    super(queryBus, commandBus, mapper)
  }
}

// @inject(TODO_TYPES.MAPPER) mapper: TodoMapper
// @inject(TODO_TYPES.MAPPER) mapper: TodoMapper
