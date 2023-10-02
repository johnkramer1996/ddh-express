import { DataTypes, Model, ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import UserModel from './user.model'

export interface MembelAttributes extends MemberCreationAttributes {
  // title: string
  // text: string
  // link: string
  // slug: string
  // points: number
  // total_num_comments: number
  createdAt: Date
  updatedAt: Date
}

export interface MemberCreationAttributes {
  user_id: string
  reputation: number
}

@injectable()
class MemberModel extends Model<MembelAttributes, MemberCreationAttributes> {
  declare user_id: ForeignKey<UserModel['id']>
  declare type: string

  declare createdAt: Date
  declare updatedAt: Date
}

MemberModel.init(
  {
    user_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: 'users',
          schema: 'public',
        },
        key: 'id',
      },
      allowNull: false,
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
