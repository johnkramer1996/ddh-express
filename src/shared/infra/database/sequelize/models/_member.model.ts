import { DataTypes, Model, ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import UserModel from './user.model'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'

export interface MemberModelCreationAttributes extends PrimaryKey {
  userId: string
  reputation: number
}

export interface MembelModelAttributes extends MemberModelCreationAttributes, TimeStamp {
  // title: string
  // text: string
  // link: string
  // slug: string
  // points: number
  // total_num_comments: number
}

@injectable()
class MemberModel extends Model<Omit<MembelModelAttributes, 'userId'>, MemberModelCreationAttributes> {
  declare user_id: ForeignKey<UserModel['id']>
  declare reputation: string

  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date | null
}

MemberModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    reputation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'members',
    sequelize,
  }
)

export default MemberModel
