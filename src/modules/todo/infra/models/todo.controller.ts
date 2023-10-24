import { TodoMapper } from '@src/modules/todo/domain/todo.mapper'
import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { BaseController } from '@src/shared/infra/http/models/base.controller'
import { inject } from 'inversify'
import { TYPES } from '@src/shared/di/types'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'

export abstract class TodoController extends BaseController {
  constructor(
    @inject(TYPES.QUERY_BUS) protected queryBus: IQueryBus,
    @inject(TYPES.COMMAND_BUS) protected commandBus: ICommandBus,
    @inject(TODO_TYPES.MAPPER) public mapper: TodoMapper
  ) {
    super(queryBus, commandBus)
  }
}
