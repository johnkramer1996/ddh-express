import express, { Router } from 'express'
import { inject, injectable } from 'inversify'
import { todoUrls } from '../../../../../configs/routes'
import { TYPES } from '../../../../../shared/infra/di/types'
import { FindTodosController } from '../../../useCases/queries/find-todos/find-todos.controller'
import { CreateTodoController } from '@src/modules/todo/useCases/commands/create-todo/create-todo.controller'

@injectable()
class TodoRouter {
  constructor(
    @inject(TYPES.FIND_TODOS_CONTROLLER) private findTodosController: FindTodosController,
    @inject(TYPES.CREATE_TODO_CONTROLLER) private createTodoController: CreateTodoController
  ) {}
  get(): Router {
    const router = express.Router()

    router.get(todoUrls.findAll, this.findTodosController.execute.bind(this.findTodosController))
    router.post(todoUrls.createOne, this.createTodoController.execute.bind(this.createTodoController))

    return router
  }
}

export default TodoRouter
