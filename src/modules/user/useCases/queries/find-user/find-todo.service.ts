import { TodoEntity } from '@src/modules/todo/domain/todo.entity'
import { TodoRepositoryPort } from '@src/modules/todo/repository/repository.port'
import { Result } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { TYPES } from '@src/shared/infra/di/types'
import { inject, injectable } from 'inversify'
import { FindUserQuery } from './find-todo.query'
import { getStringFromUnknown } from '@src/shared/utils/get-error'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'
import { IQueryHandler, QueryHandler } from '../../../../../shared/core/cqs/query-handler'
import { USER_TYPES } from '@src/modules/user/infra/di/types'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'

export type FindUserServiceResponse = Result<true, UserEntity> | Result<false, Error>

@injectable()
@QueryHandler(FindUserQuery)
export class FindUserService implements IQueryHandler<FindUserQuery, FindUserServiceResponse> {
  constructor(@inject(USER_TYPES.REPOSITORY) private repository: UserRepositoryPort) {}

  async execute(query: FindUserQuery): Promise<FindUserServiceResponse> {
    try {
      const todo = await this.repository.findOneById(query.userId)
      if (!todo) return Result.fail(new TodoNotFoundException(query.userId))

      return Result.ok(todo)
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
