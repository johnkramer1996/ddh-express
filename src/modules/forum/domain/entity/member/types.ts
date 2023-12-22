import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { AggregateID } from '@src/shared/domain/entity'

// TODO:
// Раз клиент не может быть создан без пользователя, то отразим это в коде класса Client:
// create simple entity
export interface MemberEntityCreationProps {
  userId: AggregateID
}

export interface MemberEntityProps extends MemberEntityCreationProps {
  reputation: number
  isBanned: boolean
}

export interface MemberModelCreationAttributes extends PrimaryKey {
  userId: string
  reputation: number
  isBanned: boolean
}

export interface MemberModelAttributes extends MemberModelCreationAttributes, TimeStamp {
  user?: UserModelAttributes
}

export interface MemberModelWithAdditonAttributes extends MemberModelCreationAttributes, TimeStamp {}
