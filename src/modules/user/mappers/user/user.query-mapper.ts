import { injectable } from 'inversify'
import { QueryMapper } from '@src/shared/domain/mapper-query.interface'
import { UserQuery } from '../../domain/user.query'
import { UserModelAttributes } from '../../domain/user.types'
import { UserResponseDto } from '../../dtos/user.response.dto'

@injectable()
export class UserQueryMapper implements QueryMapper<UserQuery, UserModelAttributes, UserResponseDto> {
  public toQuery(record: UserModelAttributes): UserQuery {
    // get users throw error
    if (!record.address) throw new Error('Include address to user is required')
    return new UserQuery({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      avatar: record.avatar,
      login: record.login,
      email: record.email,
      firstName: record.firstName,
      lastName: record.lastName,
      country: record.address.country,
      postalCode: record.address.postalCode,
      street: record.address.street,
      isDeleted: record.isDeleted,
      lastLogin: record.lastLogin,
    })
  }

  public toResponse(query: UserQuery): UserResponseDto {
    return new UserResponseDto({
      id: query.id,
      createdAt: query.createdAt,
      updatedAt: query.updatedAt,
      avatar: query.avatar,
      email: query.email,
      login: query.login,
      firstName: query.firstName,
      lastName: query.lastName,
      country: query.country,
      postalCode: query.postalCode,
      street: query.street,
      isDeleted: query.isDeleted,
      lastLogin: query.lastLogin,
    })
  }
}
