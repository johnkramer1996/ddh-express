import { Address, AddressModelAttributes } from '@src/modules/user/domain/value-objects/address.value-object'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { Password } from './value-objects/password.value-object'
import { PostModelAttributes } from '@src/modules/forum/domain/entity/post/types'
import { PostEntity } from '@src/modules/forum/domain/entity/post/entity'
import { Login } from './value-objects/login.value-object'
import { Email } from './value-objects/email.value-object'
import { Permission } from './value-objects/permissions.value-object'
import { PermissionModel } from '@src/shared/infra/database/sequelize/models/permisison.model'

export interface UserEntityCreationProps {
  login: Login
  password: Password
  email: Email
}

export interface UserEntityProps extends UserEntityCreationProps {
  permissions: Permission[]
  avatar: string | null
  firstName: string | null
  lastName: string | null
  isEmailVerified: boolean
  isAdminUser: boolean
  isDeleted: boolean
  lastLogin: Date | null
  address: Address
}

export interface UserModelCreationAttributes extends PrimaryKey {
  login: string
  email: string
  password: string
  permissions?: PermissionModel[]
}

export interface UserModelAttributes extends UserModelCreationAttributes, TimeStamp {
  avatar: string | null
  firstName: string | null
  lastName: string | null
  isEmailVerified: boolean
  isAdminUser: boolean
  isDeleted: boolean
  lastLogin: Date | null
  address?: AddressModelAttributes
  posts?: PostModelAttributes[]
}

export type UpdateUserProps = {
  readonly email?: string
  readonly avatar?: string
  readonly password?: string
  readonly deleteAvatar?: boolean
  readonly firstName?: string
  readonly lastName?: string
}
