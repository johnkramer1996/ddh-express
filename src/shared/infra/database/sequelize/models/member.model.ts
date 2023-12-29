import { Model, ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { MemberModelAttributes, MemberModelCreationAttributes } from '@src/modules/forum/domain/entity/member/member.types'
import memberInit from '../init/member.init'
import { UserModel } from './user.model'
import { RoleModel } from './role.model'
import { DB_TABLES } from '@src/configs/dbtables'

@injectable()
export class MemberModel extends Model<MemberModelAttributes, MemberModelCreationAttributes> {
  declare id: string
  declare userId: ForeignKey<UserModel['id']>
  declare reputation: string
  declare isBanned: boolean
  declare lastActiveAt: Date
  declare createdAt: Date
  declare updatedAt: Date | null
}

MemberModel.init(memberInit, {
  modelName: DB_TABLES.MEMBER,
  sequelize,
  defaultScope: {
    include: [
      { as: 'user', model: UserModel },
      { as: 'roles', model: RoleModel, attributes: ['role'], through: { attributes: [] } },
    ],
  },
})
