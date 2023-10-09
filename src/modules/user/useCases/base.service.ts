import { inject } from 'inversify'
import { USER_TYPES } from '../di/user.types'
import { ServiceBase } from '@src/shared/core/service.base'
import { UserRepositoryPort } from '../repository/repository.port'
import { AuthServicePort } from '../services/auth.service.port'

export abstract class UserService<T1, T2> extends ServiceBase<T1, T2> {
  constructor(@inject(USER_TYPES.REPOSITORY) protected userRepo: UserRepositoryPort, @inject(USER_TYPES.AUTH_SERVICE) protected authService: AuthServicePort) {
    super()
  }
}
