import { inject } from 'inversify'
import { USER_TYPES } from '../../infra/di/types'
import { Service } from '@src/shared/core/service'
import { UserRepositoryPort } from '../../repository/repository.port'

export abstract class UserService<T1, T2> extends Service<T1, T2> {
  constructor(@inject(USER_TYPES.REPOSITORY) protected repository: UserRepositoryPort) {
    super(repository)
  }
}
