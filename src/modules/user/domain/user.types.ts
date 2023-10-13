import { Address, AddressModelAttributes } from '@src/modules/user/domain/value-objects/address.value-object'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { Password } from './value-objects/password.value-object'
import { PostModelAttributes } from '@src/modules/forum/domain/entity/post/types'
import { PostEntity } from '@src/modules/forum/domain/entity/post/entity'
import Email from './value-objects/email.value-object'
import Login from './value-objects/login.value-object'

export interface UserEntityCreationProps {
  login: Login
  password: Password
  email: Email
}

export interface UserEntityProps extends UserEntityCreationProps {
  isEmailVerified: boolean
  isAdminUser: boolean
  isDeleted: boolean
  lastLogin: Date | null
  address: Address | null
  posts?: PostEntity[]
}

export interface UserModelCreationAttributes extends PrimaryKey {
  login: string
  email: string
  password: string
}

export interface UserModelAttributes extends UserModelCreationAttributes, TimeStamp {
  isEmailVerified: boolean
  isAdminUser: boolean
  isDeleted: boolean
  lastLogin: Date | null
  address?: AddressModelAttributes
  posts?: PostModelAttributes[]
}
