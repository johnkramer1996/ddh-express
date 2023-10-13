import { Model, ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import UserModel from './user.model'
import { MemberModelAttributes, MemberModelCreationAttributes } from '@src/modules/forum/domain/entity/member/types'
import memberInit from '../init/member.init'

@injectable()
class MemberModel extends Model<MemberModelAttributes, MemberModelCreationAttributes> {
  declare userId: ForeignKey<UserModel['id']>
  declare reputation: string
  declare isBanned: boolean

  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date | null
}

MemberModel.init(memberInit, { modelName: 'members', sequelize })

export default MemberModel
