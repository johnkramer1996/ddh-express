import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'

export interface MemberEntityCreationProps {
  userId: string
}

export interface MemberEntityProps extends MemberEntityCreationProps {
  reputation: number
  login?: string
}

export interface MemberModelCreationAttributes extends PrimaryKey {
  userId: string
  reputation: number
}

export interface MemberModelAttributes extends MemberModelCreationAttributes, TimeStamp {
  user?: UserModelAttributes
}
