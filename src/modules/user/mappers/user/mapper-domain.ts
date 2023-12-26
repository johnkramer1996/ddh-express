import { injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { UserEntity } from '../../domain/user.entity'
import { UserModelAttributes } from '../../domain/user.types'
import { Address } from '@src/modules/user/domain/value-objects/address.value-object'
import { Password } from '../../domain/value-objects/password.value-object'
import { Email } from '../../domain/value-objects/email.value-object'
import { Login } from '../../domain/value-objects/login.value-object'
import { Permission } from '../../domain/value-objects/permissions.value-object'

@injectable()
export class UserMapper implements Mapper<UserEntity, UserModelAttributes> {
  public toPersistence(entity: UserEntity): UserModelAttributes {
    const copy = entity.getProps()
    const record: UserModelAttributes = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      deletedAt: copy.deletedAt,
      avatar: copy.avatar,
      login: copy.login.value,
      email: copy.email.value,
      password: copy.password.value,
      firstName: copy.firstName,
      lastName: copy.lastName,
      lastLogin: copy.lastLogin,
      isDeleted: copy.isDeleted,
      isAdminUser: copy.isAdminUser,
      isEmailVerified: copy.isEmailVerified,
    }
    return record
  }

  public toDomain(record: UserModelAttributes): UserEntity {
    if (!record.address) throw new Error('Include address to user is required')
    const entity = new UserEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        permissions: record.permissions ? record.permissions.map((p) => new Permission({ value: p.permission })) : [],
        avatar: record.avatar ?? null,
        login: Login.create({ value: record.login }),
        email: Email.create({ value: record.email }),
        password: Password.create({ value: record.password, hashed: true }),
        firstName: record.firstName,
        lastName: record.lastName,
        isDeleted: record.isDeleted,
        isAdminUser: record.isAdminUser,
        isEmailVerified: record.isEmailVerified,
        lastLogin: record.lastLogin,
        address: new Address({
          country: record.address?.country ?? null,
          postalCode: record.address?.postalCode ?? null,
          street: record.address?.street ?? null,
        }),
      },
    })
    return entity
  }
}
