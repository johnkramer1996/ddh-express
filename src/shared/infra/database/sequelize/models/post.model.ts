import { DataTypes, Model, ForeignKey, NonAttribute } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { PostModelAttributes, PostModelCreationAttributes } from '@src/modules/forum/domain/post.types'
import UserModel from './user.model'

@injectable()
class PostModel extends Model<PostModelAttributes, PostModelCreationAttributes> {
  declare text: string
  declare userId: ForeignKey<UserModel['id']>

  declare user?: NonAttribute<UserModel>

  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date | null
}

PostModel.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
    },
    userId: {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: 'users',
          schema: 'public',
        },
        key: 'id',
      },
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    text: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    link: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    points: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    totalNumComments: {
      field: 'total_num_comments',
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      field: 'created_at',
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'posts',
    sequelize,
    defaultScope: {
      // include: [{ model: UserModel, as: 'user' }],
    },
  }
)

//has many vote

export default PostModel
