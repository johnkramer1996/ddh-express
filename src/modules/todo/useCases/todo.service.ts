import { inject } from 'inversify'
import { Service } from '@src/shared/core/service'
import { TODO_TYPES } from '../infra/di/types'
import { TodoRepositoryPort } from '../repository/repository.port'

export abstract class TodoService<T1, T2> extends Service<T1, T2> {
  constructor(@inject(TODO_TYPES.REPOSITORY) protected repository: TodoRepositoryPort) {
    super(repository)
  }
}
