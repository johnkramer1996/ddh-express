import { inject } from 'inversify'
import { USER_TYPES } from '../di/types'
import { ServiceBase } from '@src/shared/core/service.base'
import { UserRepositoryPort } from '../repository/repository.port'

export abstract class UserService<T1, T2> extends ServiceBase<T1, T2> {
  constructor(@inject(USER_TYPES.REPOSITORY) protected commentRepo: UserRepositoryPort) {
    super(commentRepo)
  }
}
