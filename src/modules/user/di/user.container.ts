import { Container } from 'inversify'
import { USER_TYPES } from './user.types'
import { UserMapper } from '../mappers/user/mapper-domain'
import { UserRepositoryPort } from '../repository/repository.port'
import { UserSequelizeRepository } from '../repository/repository.sequelize'
import UserModel from '@src/shared/infra/database/sequelize/models/user.model'
import { FindUsersController } from '../useCases/queries/find-users/controller'
import { FindUsersService } from '../useCases/queries/find-users/service'
import { RedisAuthService } from '../services/auth.service.redis'
import { AuthServicePort } from '../services/auth.service.port'
import { LoginController } from '../useCases/commands/login/controller'
import { LoginService } from '../useCases/commands/login/service'
import { CurrentUserService } from '../useCases/queries/find-current-user/service'
import { CurrentUserController } from '../useCases/queries/find-current-user/controller'
import { LogoutController } from '../useCases/commands/logout/controller'
import { LogoutService } from '../useCases/commands/logout/service'
import { RefreshTokenController } from '../useCases/commands/refresh-token/controller'
import { RefreshTokenService } from '../useCases/commands/refresh-token/service'
import { FindUserByLoginController } from '../useCases/queries/find-user-by-login/controller'
import { FindUserByIdService } from '../useCases/queries/find-user-by-login/service'
import { DeleteUserController } from '../useCases/commands/delete-user-by-login/controller'
import { UserDeleteService } from '../useCases/commands/delete-user-by-login/service'
import { CreateUserController } from '../useCases/commands/create-user/controller'
import { CreateUserService } from '../useCases/commands/create-user/service'
import { RecoverUserController } from '../useCases/commands/restore-user/controller'
import { RecoverUserService } from '../useCases/commands/restore-user/service'
import { UserSequelizeRepositoryQuery } from '../repository/repository-query.sequelize'
import { UserQueryMapper } from '../mappers/user/mapper-query'

const userModule = (container: Container) => {
  container.bind(USER_TYPES.MAPPER).to(UserMapper)
  container.bind(USER_TYPES.QUERY_MAPPER).to(UserQueryMapper)
  container.bind<UserRepositoryPort>(USER_TYPES.REPOSITORY).to(UserSequelizeRepository)
  container.bind<AuthServicePort>(USER_TYPES.AUTH_SERVICE).to(RedisAuthService)
  container.bind(USER_TYPES.SEQUELIZE_MODEL).toConstantValue(UserModel)

  // TODO: ADD INTERFACE
  container.bind(UserSequelizeRepositoryQuery).toSelf()

  container.bind(FindUsersController).toSelf()
  container.bind(FindUsersService).toSelf()

  container.bind(FindUserByLoginController).toSelf()
  container.bind(FindUserByIdService).toSelf()

  container.bind(CreateUserController).toSelf()
  container.bind(CreateUserService).toSelf()

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
