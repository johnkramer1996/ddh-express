import { inject } from 'inversify'
import { ServiceBase } from '@src/shared/core/service.base'
import { TODO_TYPES } from '../infra/di/types'
import { TodoRepositoryPort } from '../repository/repository.port'

export abstract class TodoService<T1, T2> extends ServiceBase<T1, T2> {
  constructor(@inject(TODO_TYPES.REPOSITORY) protected postRepo: TodoRepositoryPort) {
    super(postRepo)
  }
}
