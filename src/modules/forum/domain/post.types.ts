import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'

export interface PostEntityCreationProps {
  text: string
}

export interface PostEntityProps extends PostEntityCreationProps {
  user?: { [key: string]: any }
}

export interface PostModelCreationAttributes extends PrimaryKey {
  text: string
}

export interface PostModelAttributes extends PostModelCreationAttributes, TimeStamp {
  user?: UserModelAttributes
}
