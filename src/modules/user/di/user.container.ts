import { Container } from 'inversify'
import { USER_TYPES } from './user.types'
import { UserMapper } from '../mappers/user/user.mapper'
import { UserRepositoryPort, UserRepositoryQueryPort } from '../repository/user.repository.port'
import { UserSequelizeRepository } from '../repository/user.repository.sequelize'
import { FindUsersController } from '../useCases/queries/find-users/find-users.controller'
import { FindUsersService } from '../useCases/queries/find-users/find-users.service'
import { RedisAuthService } from '../services/auth.service.redis'
import { AuthServicePort } from '../services/auth.service.port'
import { LoginController } from '../useCases/commands/login/login.controller'
import { LoginService } from '../useCases/commands/login/login.service'
import { CurrentUserService } from '../useCases/queries/find-current-user/find-current-user.service'
import { CurrentUserController } from '../useCases/queries/find-current-user/find-current-user.controller'
import { LogoutController } from '../useCases/commands/logout/logout.controller'
import { LogoutService } from '../useCases/commands/logout/logout.service'
import { RefreshTokenController } from '../useCases/commands/refresh-token/refresh-token.controller'
import { RefreshTokenService } from '../useCases/commands/refresh-token/refresh-token.service'
import { FindUserByLoginController } from '../useCases/queries/find-user-by-login/find-user-by-login.controller'
import { FindUserByIdService } from '../useCases/queries/find-user-by-login/find-user-by-login.service'
import { DeleteUserController } from '../useCases/commands/delete-user-by-login/delete-user-by-login.controller'
import { DeleteUserService } from '../useCases/commands/delete-user-by-login/delete-user-by-login.service'
import { CreateUserController } from '../useCases/commands/create-user/create-user.controller'
import { CreateUserService } from '../useCases/commands/create-user/create-user.service'
import { UserSequelizeRepositoryQuery } from '../repository/user.repository-query.sequelize'
import { UserQueryMapper } from '../mappers/user/user.query-mapper'
import { UpdateUserController } from '../useCases/commands/update-user/update-user.controller'
import { UpdateUserService } from '../useCases/commands/update-user/update-user.service'
import { AddressModel } from '@src/shared/infra/database/sequelize/models/address.model'
import { UserModel } from '@src/shared/infra/database/sequelize/models/user.model'

export const userModule = (container: Container) => {
  container.bind(USER_TYPES.MAPPER).to(UserMapper)
  container.bind(USER_TYPES.QUERY_MAPPER).to(UserQueryMapper)
  container.bind<UserRepositoryPort>(USER_TYPES.REPOSITORY).to(UserSequelizeRepository)
  container.bind<UserRepositoryQueryPort>(USER_TYPES.QUERY_REPOSITORY).to(UserSequelizeRepositoryQuery)
  container.bind<AuthServicePort>(USER_TYPES.AUTH_SERVICE).to(RedisAuthService)
  container.bind(USER_TYPES.SEQUELIZE_MODEL).toConstantValue(UserModel)
  container.bind(USER_TYPES.SEQUELIZE_ADDRESS_MODEL).toConstantValue(AddressModel)

  container.bind(FindUsersController).toSelf()
  container.bind(FindUsersService).toSelf()

  container.bind(FindUserByLoginController).toSelf()
  container.bind(FindUserByIdService).toSelf()

  container.bind(CreateUserController).toSelf()
  container.bind(CreateUserService).toSelf()

  container.bind(UpdateUserController).toSelf()
  container.bind(UpdateUserService).toSelf()

  container.bind(DeleteUserController).toSelf()
  container.bind(DeleteUserService).toSelf()

  container.bind(LoginController).toSelf()
  container.bind(LoginService).toSelf()

  container.bind(LogoutController).toSelf()
  container.bind(LogoutService).toSelf()

  container.bind(CurrentUserController).toSelf()
  container.bind(CurrentUserService).toSelf()

  container.bind(RefreshTokenController).toSelf()
  container.bind(RefreshTokenService).toSelf()
}
