import express, { Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../di/types'
import TodoRouter from '../../../../modules/todo/infra/http/routes'
import { todoUrls } from '../../../../configs/routes'

@injectable()
class HTTPRouter {
  constructor(@inject(TYPES.TODO_ROUTER) private todoRouter: TodoRouter) {}

  get(): Router {
    const router = express.Router()

    router.use(todoUrls.root, this.todoRouter.get())
    // router.use('/users', userRouter)
    // router.use('/posts', postRouter)
    // router.use('/comments', commentRouter)

    return router
  }
}

export default HTTPRouter
