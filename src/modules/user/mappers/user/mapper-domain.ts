import { injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { UserResponseDto } from '../../dtos/user.response.dto'
import { UserEntity } from '../../domain/user.entity'
import { UserModelAttributes } from '../../domain/user.types'
import { Address } from '@src/modules/user/domain/value-objects/address.value-object'
import { Password } from '../../domain/value-objects/password.value-object'
import { Email } from '../../domain/value-objects/email.value-object'
import { Login } from '../../domain/value-objects/login.value-object'

@injectable()
export class UserMapper implements Mapper<UserEntity, UserModelAttributes, UserResponseDto> {
  public toPersistence(entity: UserEntity): UserModelAttributes {
    const copy = entity.getProps()
    const record: UserModelAttributes = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      deletedAt: copy.deletedAt,
      email: copy.email.value,
      password: copy.password.value,
      login: copy.login.value,
      lastLogin: copy.lastLogin,
      isDeleted: copy.isDeleted,
      isAdminUser: copy.isAdminUser,
      isEmailVerified: copy.isEmailVerified,
    }
    return record
  }

  public toDomain(record: UserModelAttributes): UserEntity {
    const entity = new UserEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        email: Email.create({ value: record.email }),
        password: Password.create({ value: record.password, hashed: true }),
        login: Login.create({ value: record.login }),
        isDeleted: record.isDeleted,
        isAdminUser: record.isAdminUser,
        isEmailVerified: record.isEmailVerified,
        lastLogin: record.lastLogin,
        address: record.address
          ? new Address({
              country: record.address?.country ?? null,
              postalCode: record.address?.postalCode ?? null,
              street: record.address?.street ?? null,
            })
          : null,
        // posts: undefined,
        // TODO: add posts
        // posts: record.posts,
      },
    })
    return entity
  }

  public toResponse(entity: UserEntity): UserResponseDto {
    const copy = entity.getProps()
    return new UserResponseDto({
      ...copy,
      email: copy.email.value,
      country: copy.address?.country,
      postalCode: copy.address?.postalCode,
      street: copy.address?.street,
    })
  }
}
