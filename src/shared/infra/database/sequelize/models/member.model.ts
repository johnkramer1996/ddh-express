import { Model, ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { MemberModelAttributes, MemberModelCreationAttributes } from '@src/modules/forum/domain/entity/member/types'
import memberInit from '../init/member.init'
import { UserModel } from './user.model'

@injectable()
class MemberModel extends Model<MemberModelAttributes, MemberModelCreationAttributes> {
  declare id: string
  declare userId: ForeignKey<UserModel['id']>
  declare reputation: string
  declare isBanned: boolean
  declare lastActiveAt: Date
  declare createdAt: Date
  declare updatedAt: Date
}

MemberModel.init(memberInit, {
  modelName: 'members',
  sequelize,
  defaultScope: {
    include: { as: 'user', model: UserModel },
  },
})

export default MemberModel
