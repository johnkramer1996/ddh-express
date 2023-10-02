import { Address, AddressAttributes } from '@src/modules/user/domain/value-objects/address.value-object'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { Password } from './value-objects/password.value-object'

export interface UserCreationProps {
  email: string
  password: Password
}

export interface UserProps extends UserCreationProps {
  username: string | null
  isEmailVerified: boolean
  isAdminUser: boolean
  isDeleted: boolean
  lastLogin: Date | null
  address: Address
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
  address?: AddressAttributes
}
