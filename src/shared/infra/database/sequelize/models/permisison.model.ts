import { sequelize } from '../config/connection'
import { BaseModel } from './base.model'
import permissionInit from '../init/permission.init'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { DB_TABLES } from '@src/configs/dbtables'
import { UserPermission } from '@src/shared/core/jwt'

export interface PermissionModelCreationAttributes {
  permission: UserPermission
}

export interface PermissionModelAttributes extends PermissionModelCreationAttributes, TimeStamp {}

export class PermissionModel extends BaseModel<PermissionModelAttributes, PermissionModelCreationAttributes> {
  declare permission: UserPermission
}

PermissionModel.init(permissionInit, { tableName: DB_TABLES.PERMISSION, sequelize })
