import { Container } from 'inversify'
import { TODO_TYPES } from './types'
import { TodoMapper } from '../../domain/todo.mapper'
import { TodoSequelizeRepository } from '../../repository/repository'
import TodoModel from '@src/shared/infra/database/sequelize/models/todo.model'
import { FindTodosController } from '../../useCases/queries/find-todos/find-todos.controller'
import { FindTodosService } from '../../useCases/queries/find-todos/find-todos.service'
import { FindTodoController } from '../../useCases/queries/find-todo/find-todo.controller'
import { FindTodoService } from '../../useCases/queries/find-todo/find-todo.service'
import { CreateTodoController } from '../../useCases/commands/create-todo/create-todo.controller'
import { CreateTodoService } from '../../useCases/commands/create-todo/create-todo.service'
import { UpdateTodoController } from '../../useCases/commands/update-todo/update-todo.controller'
import { UpdateTodoService } from '../../useCases/commands/update-todo/update-todo.service'
import { DeleteTodoController } from '../../useCases/commands/delete-todo/delete-todo.controller'
import { DeleteTodoService } from '../../useCases/commands/delete-todo/delete-todo.service'
import { TodoRepositoryPort } from '../../repository/repository.port'

const todoModule = (container: Container) => {
  container.bind(TODO_TYPES.MAPPER).to(TodoMapper)
  container.bind<TodoRepositoryPort>(TODO_TYPES.REPOSITORY).to(TodoSequelizeRepository)
  container.bind(TODO_TYPES.TODO_SEQUELIZE_MODEL).toConstantValue(TodoModel)

  container.bind(FindTodosController).toSelf()
  container.bind(FindTodosService).toSelf()

  container.bind(FindTodoController).toSelf()
  container.bind(FindTodoService).toSelf()

  container.bind(CreateTodoController).toSelf()
  container.bind(CreateTodoService).toSelf()

  container.bind(UpdateTodoController).toSelf()
  container.bind(UpdateTodoService).toSelf()

  container.bind(DeleteTodoController).toSelf()
  container.bind(DeleteTodoService).toSelf()
}

export default todoModule
