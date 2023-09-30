import { TodoEntity } from '@src/modules/todo/domain/todo.entity'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { Result } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { inject, injectable } from 'inversify'
import { FindUsersQuery } from './find-users.query'
import { getStringFromUnknown } from '@src/shared/utils/get-error'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { USER_TYPES } from '@src/modules/user/infra/di/types'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { IQueryHandler, QueryHandler } from '@src/shared/core/cqs/query-handler'

export type FindUsersServiceResponse = Result<true, Paginated<UserEntity>> | Result<false, Error>

@injectable()
@QueryHandler(FindUsersQuery)
export class FindUsersService implements IQueryHandler<FindUsersQuery, FindUsersServiceResponse> {
  constructor(@inject(USER_TYPES.REPOSITORY) private repository: UserRepositoryPort) {}

  async execute(query: FindUsersQuery): Promise<FindUsersServiceResponse> {
    try {
      const items = await this.repository.findAllPaginated(query)

      return Result.ok(items)
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
