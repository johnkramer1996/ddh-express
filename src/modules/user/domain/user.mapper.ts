import { injectable } from 'inversify'
import { Mapper } from '../../../shared/domain/mapper.interface'
import { UserResponseDto } from '../dtos/user.response.dto'
import { UserEntity } from './user.entity'
import { UserAttributes } from '@src/shared/infra/database/sequelize/models/user.model'
import { AddressAttributes } from '@src/shared/infra/database/sequelize/models/address.model'
import { Address } from '@src/modules/todo/domain/value-objects/addres.value-object'

@injectable()
export class UserMapper implements Mapper<UserEntity, UserAttributes, UserResponseDto> {
  public toPersistence(entity: UserEntity): UserAttributes {
    const copy = entity.getProps()
    const record: UserAttributes = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      email: copy.email,
      password: copy.password,
      username: copy.username,
      last_login: copy.lastLogin,
      is_deleted: copy.isDeleted,
      is_admin_user: copy.isAdminUser,
      is_email_verified: copy.isEmailVerified,
    }
    return record
  }

  public toDomain(record: UserAttributes & { address?: AddressAttributes }): UserEntity {
    const entity = new UserEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        email: record.email,
        password: record.password,
        username: record.username,
        isDeleted: record.is_deleted,
        isAdminUser: record.is_admin_user,
        isEmailVerified: record.is_email_verified,
        lastLogin: null,
        address: new Address({
          country: record.address?.country ?? null,
          postalCode: record.address?.country ?? null,
          street: record.address?.street ?? null,
        }),
      },
    })
    return entity
  }

  public toResponse(entity: UserEntity): UserResponseDto {
    const copy = entity.getProps()
    return new UserResponseDto({ ...copy, country: copy.address.country, street: copy.address.street })
  }
}
