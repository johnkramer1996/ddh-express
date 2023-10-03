import { DataTypes, Model, ForeignKey, NonAttribute } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { PostModelAttributes, PostModelCreationAttributes } from '@src/modules/forum/domain/post.types'
import UserModel from './user.model'

@injectable()
class PostModel extends Model<Omit<PostModelAttributes, 'userId'>, PostModelCreationAttributes> {
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
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalNumComments: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
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
