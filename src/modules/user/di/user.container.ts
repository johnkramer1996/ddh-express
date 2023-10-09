import { Container } from 'inversify'
import { USER_TYPES } from './user.types'
import { UserMapper } from '../mappers/user.mapper'
import { UserRepositoryPort } from '../repository/repository.port'
import { UserSequelizeRepository } from '../repository/repository.sequelize'
import UserModel from '@src/shared/infra/database/sequelize/models/user.model'
import { FindUsersController } from '../useCases/queries/find-users/controller'
import { FindUsersService } from '../useCases/queries/find-users/service'
import { RedisAuthService } from '../services/auth.service.redis'
import { AuthServicePort } from '../services/auth.service.port'
import { LoginController } from '../useCases/commands/login/controller'
import { LoginService } from '../useCases/commands/login/service'
import { CurrentUserService } from '../useCases/queries/current-user/service'
import { CurrentUserController } from '../useCases/queries/current-user/controller'
import { LogoutController } from '../useCases/commands/logout/controller'
import { LogoutService } from '../useCases/commands/logout/service'
import { RefreshTokenController } from '../useCases/commands/refresh-token/controller'
import { RefreshTokenService } from '../useCases/commands/refresh-token/service'
import { FindUserController } from '../useCases/queries/find-by-id-user/controller'
import { FindUserService } from '../useCases/queries/find-by-id-user/service'
import { DeleteUserController } from '../useCases/commands/delete-user/controller'
import { UserDeleteService } from '../useCases/commands/delete-user/service'
import { CreateUserController } from '../useCases/commands/create-user/controller'
import { UserCreateService } from '../useCases/commands/create-user/service'
import { RecoverUserController } from '../useCases/commands/restore-user/controller'
import { RecoverUserService } from '../useCases/commands/restore-user/service'

const userModule = (container: Container) => {
  container.bind(USER_TYPES.MAPPER).to(UserMapper)
  container.bind<UserRepositoryPort>(USER_TYPES.REPOSITORY).to(UserSequelizeRepository)
  container.bind<AuthServicePort>(USER_TYPES.AUTH_SERVICE).to(RedisAuthService)
  container.bind(USER_TYPES.SEQUELIZE_MODEL).toConstantValue(UserModel)

  container.bind(FindUsersController).toSelf()
  container.bind(FindUsersService).toSelf()

  container.bind(FindUserController).toSelf()
  container.bind(FindUserService).toSelf()

  container.bind(CreateUserController).toSelf()
  container.bind(UserCreateService).toSelf()

  container.bind(DeleteUserController).toSelf()
  container.bind(UserDeleteService).toSelf()

  container.bind(RecoverUserController).toSelf()
  container.bind(RecoverUserService).toSelf()

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
