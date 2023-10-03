import { DataTypes, Model, ForeignKey, NonAttribute } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import UserModel from './user.model'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'

export interface CommentModelCreationAttributes extends PrimaryKey {
  userId: string
  text: string
}

export interface CommentModelAttributes extends CommentModelCreationAttributes, TimeStamp {
  // title: string
  // text: string
  // link: string
  // slug: string
  // points: number
  // total_num_comments: number
}

@injectable()
class CommentModel extends Model<Omit<CommentModelAttributes, 'userId'>, CommentModelCreationAttributes> {
  declare id: string
  declare userId: ForeignKey<UserModel['id']>
  declare text: string

  declare user?: NonAttribute<UserModel>

  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date | null
}

CommentModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'comments',
    sequelize,
  }
)

export default CommentModel
