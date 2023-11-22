import { injectable } from 'inversify'
import { QueryMapper } from '@src/shared/domain/mapper-query.interface'
import { UserQuery } from '../../domain/user.query'
import { UserModelAttributes } from '../../domain/user.types'
import { UserResponseDto } from '../../dtos/user.response.dto'

@injectable()
export class UserQueryMapper implements QueryMapper<UserQuery, UserModelAttributes, UserResponseDto> {
  public toQuery(record: UserModelAttributes): UserQuery {
    return new UserQuery({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      login: record.login,
      email: record.email,
      password: record.password,
    })
  }

  public toResponse(query: UserQuery): UserResponseDto {
    return new UserResponseDto({
      id: query.id,
      createdAt: query.createdAt,
      updatedAt: query.updatedAt,
      email: query.email,
    })
  }
}
