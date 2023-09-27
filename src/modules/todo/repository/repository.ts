import { injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../shared/infra/database/sequelize/repository.base'
import { TodoEntity } from '../domain/todo.entity'
import TodoModel, { TodoAttributes } from '../../../shared/infra/database/sequelize/models/todo.model'
import { TodoRepositoryPort } from './repository.port'
import { TodoMapper } from '../domain/todo.mapper'
import { Column, DataType, Model, ModelCtor, Table } from 'sequelize-typescript'

@injectable()
export class TodoSequelizeRepository extends SequelizeRepositoryBase<TodoEntity, TodoAttributes> implements TodoRepositoryPort {
  constructor() {
    super(new TodoMapper(), TodoModel)
  }
}
