import { Container } from 'inversify'
import UserRouter from '../http/routes'
import { USER_TYPES } from './types'
import { UserMapper } from '../../domain/user.mapper'
import { UserRepositoryPort } from '../../repository/repository.port'
import { UserSequelizeRepository } from '../../repository/repository.sequelize'
import UserModel from '@src/shared/infra/database/sequelize/models/user.model'
import { FindUsersController } from '../../useCases/queries/find-users/find-users.controller'
import { FindUsersService } from '../../useCases/queries/find-users/find-users.service'
import { RedisAuthService } from '../../services/auth.service.redis'
import { AuthServicePort } from '../../services/auth.service.port'
import { LoginController } from '../../useCases/commands/login/login.controller'
import { LoginService } from '../../useCases/commands/login/login.service'
import { CurrentUserService } from '../../useCases/queries/current-user/current-user.service'
import { CurrentUserController } from '../../useCases/queries/current-user/current-user.controller'
import { LogoutController } from '../../useCases/commands/logout/logout.controller'
import { LogoutService } from '../../useCases/commands/logout/logout.service'
import { RefreshTokenController } from '../../useCases/commands/refresh-token/refresh-token.controller'
import { RefreshTokenService } from '../../useCases/commands/refresh-token/refresh-token.service'

const userModule = (container: Container) => {
  container.bind(USER_TYPES.ROUTER).to(UserRouter)
  container.bind(USER_TYPES.MAPPER).to(UserMapper)
  container.bind<UserRepositoryPort>(USER_TYPES.REPOSITORY).to(UserSequelizeRepository)
  // todo change
  container.bind(USER_TYPES.SEQUELIZE_MODEL).toConstantValue(UserModel)
  container.bind<AuthServicePort>(USER_TYPES.AUTH_SERVICE).to(RedisAuthService)

  container.bind(FindUsersController).toSelf()
  container.bind(FindUsersService).toSelf()

  container.bind(LoginController).toSelf()
  container.bind(LoginService).toSelf()

  container.bind(LogoutController).toSelf()
  container.bind(LogoutService).toSelf()

  container.bind(CurrentUserController).toSelf()
  container.bind(CurrentUserService).toSelf()

  container.bind(RefreshTokenController).toSelf()
  container.bind(RefreshTokenService).toSelf()
}

export default userModule
