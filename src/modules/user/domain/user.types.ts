import { Address, AddressModelAttributes } from '@src/modules/user/domain/value-objects/address.value-object'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { Password } from './value-objects/password.value-object'
import { PostModelAttributes } from '@src/modules/forum/domain/entity/post/types'

export interface UserEntityCreationProps {
  email: string
  password: Password
}

export interface UserEntityProps extends UserEntityCreationProps {
  username: string | null
  isEmailVerified: boolean
  isAdminUser: boolean
  isDeleted: boolean
  lastLogin: Date | null
  address: Address
  posts?: any[]
}

export interface UserModelCreationAttributes extends PrimaryKey {
  email: string
  password: string
}

export interface UserModelAttributes extends UserModelCreationAttributes, TimeStamp {
  username: string | null
  isEmailVerified: boolean
  isAdminUser: boolean
  isDeleted: boolean
  lastLogin: Date | null
  address?: AddressModelAttributes
  posts?: PostModelAttributes[]
}
