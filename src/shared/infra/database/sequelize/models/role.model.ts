import { sequelize } from '../config/connection'
import { BaseModel } from './base.model'
import roleInit from '../init/role.init'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { DB_TABLES } from '@src/configs/dbtables'
import { MemberRole } from '@src/modules/forum/domain/entity/member/member.types'

export interface RoleModelCreationAttributes {
  role: MemberRole
}

export interface RoleModelAttributes extends RoleModelCreationAttributes, TimeStamp {}

export class RoleModel extends BaseModel<RoleModelAttributes, RoleModelCreationAttributes> {
  declare role: MemberRole
}

RoleModel.init(roleInit, { tableName: DB_TABLES.ROLE, sequelize })
