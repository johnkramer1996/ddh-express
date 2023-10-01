import express, { Router } from 'express'
import { injectable, multiInject } from 'inversify'
import { userUrls } from '../../../../../configs/routes'
import { FindUsersController } from '@src/modules/user/useCases/queries/find-users/find-users.controller'
import { CurrentUserController } from '@src/modules/user/useCases/queries/current-user/current-user.controller'
import { Middleware } from '@src/shared/infra/http/utils/middleware'
import { UserController } from '../../models/user.controller'

@injectable()
class UserRouter {
  constructor(
    private findUsersController: FindUsersController,
    // private loginController: LoginController,
    // private logoutController: LogoutController,
    private currentUserController: CurrentUserController,
    // private refreshTokenController: RefreshTokenController,
    private middleware: Middleware
  ) {}
  get(): Router {
    const router = express.Router()

    router.get(userUrls.findAll, this.findUsersController.execute.bind(this.findUsersController))
    // router.post(userUrls.login, this.loginController.execute.bind(this.loginController))
    // router.post(userUrls.logout, this.middleware.authenticated(true), this.logoutController.execute.bind(this.logoutController))
    // router.post(userUrls.refreshToken, this.refreshTokenController.execute.bind(this.refreshTokenController))
    router.get(userUrls.currentUser, this.middleware.authenticated(true), this.currentUserController.execute.bind(this.currentUserController))

    return router
  }
}

export default UserRouter
