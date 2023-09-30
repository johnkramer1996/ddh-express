import express, { Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../di/types'
import TodoRouter from '../../../../modules/todo/infra/http/routes'
import { todoUrls, userUrls } from '../../../../configs/routes'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'
import UserRouter from '@src/modules/user/infra/http/routes'
import { USER_TYPES } from '@src/modules/user/infra/di/types'

@injectable()
class HTTPRouter {
  constructor(@inject(TODO_TYPES.ROUTER) private todoRouter: TodoRouter, @inject(USER_TYPES.ROUTER) private userRouter: UserRouter) {}

  get(): Router {
    const router = express.Router()

    router.use(todoUrls.root, this.todoRouter.get())
    router.use(userUrls.root, this.userRouter.get())
    // router.use('/posts', postRouter)
    // router.use('/comments', commentRouter)

    return router
  }
}

export default HTTPRouter
