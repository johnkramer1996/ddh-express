import { ForeignKey, NonAttribute } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import UserModel from './user.model'
import commentInit from '../init/comment.init'
import { CommentModelAttributes, CommentModelCreationAttributes } from '@src/modules/forum/domain/entity/comments/types'
import { DB_TABLES } from '@src/configs/dbtables'
import { BaseModel } from './base.model'
import PostModel from './post.model'
import { v4 } from 'uuid'

@injectable()
class CommentModel extends BaseModel<CommentModelAttributes, CommentModelCreationAttributes> {
  declare userId: ForeignKey<UserModel['id']>
  declare postId: ForeignKey<PostModel['id']>
  declare text: string
  declare points: number

  declare user?: NonAttribute<UserModel>
}

CommentModel.init(commentInit, { tableName: DB_TABLES.COMMENT, sequelize })

export default CommentModel
