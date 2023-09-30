import express, { Router } from 'express'
import { inject, injectable } from 'inversify'
import { todoUrls } from '../../../../../configs/routes'
import { TYPES } from '../../../../../shared/infra/di/types'
import { FindTodosController } from '../../../useCases/queries/find-todos/find-todos.controller'
import { CreateTodoController } from '@src/modules/todo/useCases/commands/create-todo/create-todo.controller'
import { FindTodoController } from '@src/modules/todo/useCases/queries/find-todo/find-todo.controller'
import { UpdateTodoController } from '@src/modules/todo/useCases/commands/update-todo/update-todo.controller'
import { DeleteTodoController } from '@src/modules/todo/useCases/commands/delete-todo/delete-todo.controller'
import { TODO_TYPES } from '../../di/types'

@injectable()
class TodoRouter {
  constructor(
    private findTodosController: FindTodosController,
    private findTodoController: FindTodoController,
    private createTodoController: CreateTodoController,
    private updateTodoController: UpdateTodoController,
    private deleteTodoController: DeleteTodoController
  ) {}
  get(): Router {
    const router = express.Router()

    router.get(todoUrls.findAll, this.findTodosController.execute.bind(this.findTodosController))
    router.get(todoUrls.findOne, this.findTodoController.execute.bind(this.findTodoController))
    router.post(todoUrls.createOne, this.createTodoController.execute.bind(this.createTodoController))
    router.put(todoUrls.updateOne, this.updateTodoController.execute.bind(this.updateTodoController))
    router.delete(todoUrls.deleteOne, this.deleteTodoController.execute.bind(this.deleteTodoController))

    return router
  }
}

export default TodoRouter
