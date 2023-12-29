import { Model } from 'sequelize'
import { DB_TABLES } from '@src/configs/dbtables'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import memberRoleInit from '../init/member-role.init'

@injectable()
export class MemberRoleModel extends Model<any, any> {}

MemberRoleModel.init(memberRoleInit, { modelName: DB_TABLES.MEMBER_ROLE, sequelize })
