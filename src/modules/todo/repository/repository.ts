import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../shared/infra/database/sequelize/repository.base'
import { TodoEntity } from '../domain/todo.entity'
import TodoModel, { TodoAttributes } from '../../../shared/infra/database/sequelize/models/todo.model'
import { TodoRepositoryPort } from './repository.port'
import { TodoMapper } from '../domain/todo.mapper'
import { TYPES } from '@src/shared/infra/di/types'
import { ModelDefined } from 'sequelize'
import { TODO_TYPES } from '../infra/di/types'

@injectable()
export class TodoSequelizeRepository extends SequelizeRepositoryBase<TodoEntity, TodoAttributes> implements TodoRepositoryPort {
  constructor(@inject(TODO_TYPES.MAPPER) mapper: TodoMapper, @inject(TODO_TYPES.TODO_SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }
}
