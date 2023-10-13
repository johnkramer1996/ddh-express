import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'
import { UserEntity } from '@src/modules/user/domain/user.entity'

export interface MemberEntityCreationProps {
  userId: string
}

export interface MemberEntityProps extends MemberEntityCreationProps {
  reputation: number
  isBanned: boolean
  login?: string
  user: UserEntity | null
}

export interface MemberModelCreationAttributes extends PrimaryKey {
  userId: string
  reputation: number
  isBanned: boolean
}

export interface MemberModelAttributes extends MemberModelCreationAttributes, TimeStamp {
  user?: UserModelAttributes
}
