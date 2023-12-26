import { Model } from 'sequelize'
import { DB_TABLES } from '@src/configs/dbtables'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import userPermissionInit from '../init/user-permission.init'

@injectable()
export class UserPermissionModel extends Model<any, any> {}

UserPermissionModel.init(userPermissionInit, {
  modelName: DB_TABLES.USER_PERMISSION,
  sequelize,
})
