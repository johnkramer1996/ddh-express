import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../shared/infra/database/sequelize/base.repository'
import { TodoEntity } from '../domain/todo.entity'
import { TodoRepositoryPort } from './repository.port'
import { TodoMapper } from '../domain/todo.mapper'
import { ModelDefined } from 'sequelize'
import { TODO_TYPES } from '../infra/di/types'
import { TodoModelAttributes } from '../domain/todo.types'

@injectable()
export class TodoSequelizeRepository extends SequelizeRepositoryBase<TodoEntity, TodoModelAttributes> implements TodoRepositoryPort {
  constructor(@inject(TODO_TYPES.MAPPER) mapper: TodoMapper, @inject(TODO_TYPES.TODO_SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }
}
