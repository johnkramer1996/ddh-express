import 'reflect-metadata'

import { Container } from 'inversify'
import { TYPES } from './types'
import Server, { IServer } from '../http/server'
import HTTPRouter from '../http/api/v1'
import { TodoMapper } from '../../../modules/todo/domain/todo.mapper'
import { TodoSequelizeRepository } from '../../../modules/todo/repository/repository'
import { TodoRepositoryPort } from '../../../modules/todo/repository/repository.port'
import { FindTodosController } from '../../../modules/todo/useCases/queries/find-todos/find-todos.controller'
import { FindTodosService } from '../../../modules/todo/useCases/queries/find-todos/find-todos.service'
import TodoRouter from '../../../modules/todo/infra/http/routes'
import { CreateTodoService } from '@src/modules/todo/useCases/commands/create-todo/create-todo.service'
import { CreateTodoController } from '@src/modules/todo/useCases/commands/create-todo/create-todo.controller'

const container = new Container({ defaultScope: 'Singleton', skipBaseClassChecks: true })

container.bind<IServer>(TYPES.SERVER).to(Server)
container.bind(TYPES.HTTP_ROUTER).to(HTTPRouter)

container.bind(TYPES.TODO_ROUTER).to(TodoRouter)
container.bind(TYPES.TODO_MAPPER).to(TodoMapper)
container.bind<TodoRepositoryPort>(TYPES.TODO_REPOSITORY).to(TodoSequelizeRepository)

container.bind(TYPES.FIND_TODOS_CONTROLLER).to(FindTodosController)
container.bind(TYPES.FIND_TODOS_SERVICE).to(FindTodosService)

container.bind(TYPES.CREATE_TODO_CONTROLLER).to(CreateTodoController)
container.bind(TYPES.CREATE_TODO_SERVICE).to(CreateTodoService)

export { container }
