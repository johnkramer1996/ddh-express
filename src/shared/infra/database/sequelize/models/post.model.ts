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
    text: {
      type: DataTypes.STRING,
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
