import { TodoEntity } from '@src/modules/todo/domain/todo.entity'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { Result } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { inject, injectable } from 'inversify'
import { CurrentUserQuery } from './current-user.query'
import { getStringFromUnknown } from '@src/shared/utils/get-error'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { USER_TYPES } from '@src/modules/user/infra/di/types'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { IQueryHandler, QueryHandler } from '@src/shared/core/cqs/query-handler'
import { UserNotFoundException } from '@src/modules/user/domain/user.errors'

export type CurrentUserServiceResponse = Result<true, UserEntity> | Result<false, Error>

@injectable()
@QueryHandler(CurrentUserQuery)
export class CurrentUserService implements IQueryHandler<CurrentUserQuery, CurrentUserServiceResponse> {
  constructor(@inject(USER_TYPES.REPOSITORY) private repository: UserRepositoryPort) {}

  async execute(query: CurrentUserQuery): Promise<CurrentUserServiceResponse> {
    try {
      const user = await this.repository.findOneById(query.id)
      if (!user) return Result.fail(new UserNotFoundException(query.id))

      return Result.ok(user)
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
