import { DataTypes, Model, ForeignKey, NonAttribute } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { PostModelAttributes, PostModelCreationAttributes } from '@src/modules/forum/domain/post.types'
import UserModel from './user.model'
import { DB_TABLES } from '@src/configs/dbtables'
import postInit from '../init/post.init'

@injectable()
class PostModel extends Model<PostModelAttributes, PostModelCreationAttributes> {
  declare id: string
  declare userId: ForeignKey<UserModel['id']>
  declare text: string

  declare user?: NonAttribute<UserModel>

  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date | null
}

PostModel.init(postInit, {
  tableName: DB_TABLES.POST,
  sequelize,
  defaultScope: {
    include: [{ model: UserModel, as: 'user' }],
  },
})

export default PostModel
