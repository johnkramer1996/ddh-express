import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'
import { AggregateID } from '@src/shared/domain/entity'
import { RoleModel } from '@src/shared/infra/database/sequelize/models/role.model'
import { Roles } from '../../value-objects/roles.value-object'

export interface MemberEntityCreationProps {
  userId: AggregateID
}

export interface MemberEntityProps extends MemberEntityCreationProps {
  // roles: Role[]
  roles: Roles
  reputation: number
  isBanned: boolean
  lastActiveAt: Date | null
}

export interface MemberModelCreationAttributes extends PrimaryKey {
  roles?: RoleModel[]
  userId: string
  reputation: number
  isBanned: boolean
}

export interface MemberModelAttributes extends MemberModelCreationAttributes, TimeStamp {
  user?: UserModelAttributes
  lastActiveAt: Date | null
}

export type MemberRole = 'admin' | 'editor' | 'author' | 'contributor' | 'subscriber'
export const MemberRoleEnum: MemberRole[] = ['admin', 'editor', 'author', 'contributor', 'subscriber']
