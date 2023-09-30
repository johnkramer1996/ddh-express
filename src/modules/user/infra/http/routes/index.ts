import express, { Router } from 'express'
import { injectable } from 'inversify'
import { userUrls } from '../../../../../configs/routes'
import { FindUsersController } from '@src/modules/user/useCases/queries/find-users/find-users.controller'
import { LoginController } from '@src/modules/user/useCases/commands/login/login.controller'
import { CurrentUserController } from '@src/modules/user/useCases/queries/current-user/current-user.controller'
import { Middleware } from '@src/shared/infra/http/utils/Middleware'

@injectable()
class UserRouter {
  constructor(
    private findUsersController: FindUsersController,
    private loginController: LoginController,
    private currentUserController: CurrentUserController,
    private middleware: Middleware
  ) {}
  get(): Router {
    const router = express.Router()

    router.get(userUrls.findAll, this.findUsersController.execute.bind(this.findUsersController))
    router.post(userUrls.login, this.loginController.execute.bind(this.loginController))
    router.get(userUrls.currentUser, this.middleware.authenticated(true), this.currentUserController.execute.bind(this.currentUserController))

    return router
  }
}

export default UserRouter
