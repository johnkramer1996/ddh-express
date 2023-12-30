import { inject } from 'inversify'
import { USER_TYPES } from '../di/user.types'
import { ServiceBase } from '@src/shared/core/service.base'
import { UserRepositoryPort } from '../repository/user.repository.port'
import { AuthServicePort } from '../services/auth.service.port'
import { UserSequelizeRepositoryQuery } from '../repository/user.repository-query.sequelize'
import { UserQueryMapper } from '../mappers/user/user.query-mapper'

export abstract class UserServiceBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(@inject(USER_TYPES.REPOSITORY) protected userRepo: UserRepositoryPort, @inject(USER_TYPES.AUTH_SERVICE) protected authService: AuthServicePort) {
    super()
  }
}

export abstract class UserServiceQueryBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(
    @inject(USER_TYPES.QUERY_REPOSITORY) protected userRepo: UserSequelizeRepositoryQuery,
    @inject(USER_TYPES.QUERY_MAPPER) protected userMapper: UserQueryMapper
  ) {
    super()
  }
}
