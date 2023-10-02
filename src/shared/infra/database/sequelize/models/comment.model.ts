import { DataTypes, Model, ForeignKey, NonAttribute } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import UserModel from './user.model'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'

export interface CommentAttributes extends PostCreationAttributes, TimeStamp {
  // title: string
  // text: string
  // link: string
  // slug: string
  // points: number
  // total_num_comments: number
}

export interface PostCreationAttributes extends PrimaryKey {
  userId: string
  text: string
}

@injectable()
class CommentModel extends Model<Omit<CommentAttributes, 'userId'>, PostCreationAttributes> {
  declare id: string
  declare userId: ForeignKey<UserModel['id']>
  declare text: string

  declare user?: NonAttribute<UserModel>

  declare createdAt: Date
  declare updatedAt: Date
}

CommentModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    // user_id: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: {
    //       tableName: 'users',
    //       schema: 'public',
    //     },
    //     key: 'id',
    //   },
    //   allowNull: false,
    // },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'comments',
    sequelize,
  }
)

// CommentModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id', constraints: false })
// CommentModel.belongsTo(PostModel, { as: 'post', targetKey: 'id', foreignKey: 'post_id', constraints: false })

export default CommentModel
