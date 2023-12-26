import { Container } from 'inversify'
import { USER_TYPES } from './user.types'
import { UserMapper } from '../mappers/user/mapper-domain'
import { UserRepositoryPort, UserRepositoryQueryPort } from '../repository/repository.port'
import { UserSequelizeRepository } from '../repository/repository.sequelize'
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
import { DeleteUserService } from '../useCases/commands/delete-user-by-login/service'
import { CreateUserController } from '../useCases/commands/create-user/controller'
import { CreateUserService } from '../useCases/commands/create-user/service'
import { UserSequelizeRepositoryQuery } from '../repository/repository-query.sequelize'
import { UserQueryMapper } from '../mappers/user/mapper-query'
import { UpdateUserController } from '../useCases/commands/update-user/controller'
import { UpdateUserService } from '../useCases/commands/update-user/service'
import AddressModel from '@src/shared/infra/database/sequelize/models/address.model'
import { UserModel } from '@src/shared/infra/database/sequelize/models/user.model'
import { UserPermissionModel } from '@src/shared/infra/database/sequelize/models/user-permissions.model'

const userModule = (container: Container) => {
  container.bind(USER_TYPES.MAPPER).to(UserMapper)
  container.bind(USER_TYPES.QUERY_MAPPER).to(UserQueryMapper)
  container.bind<UserRepositoryPort>(USER_TYPES.REPOSITORY).to(UserSequelizeRepository)
  container.bind<UserRepositoryQueryPort>(USER_TYPES.QUERY_REPOSITORY).to(UserSequelizeRepositoryQuery)
  container.bind<AuthServicePort>(USER_TYPES.AUTH_SERVICE).to(RedisAuthService)
  container.bind(USER_TYPES.SEQUELIZE_MODEL).toConstantValue(UserModel)
  container.bind(USER_TYPES.SEQUELIZE_ADDRESS_MODEL).toConstantValue(AddressModel)
  container.bind(USER_TYPES.SEQUELIZE_USER_PERMISSION_MODEL).toConstantValue(UserPermissionModel)

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

export default userModule
