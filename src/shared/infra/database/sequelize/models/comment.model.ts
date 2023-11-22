import { ForeignKey, NonAttribute } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import UserModel from './user.model'
import commentInit from '../init/comment.init'
import { CommentModelAttributes, CommentModelCreationAttributes } from '@src/modules/forum/domain/entity/comments/types'
import { DB_TABLES } from '@src/configs/dbtables'
import { BaseModel } from './base.model'
import PostModel from './post.model'
import MemberModel from './member.model'

@injectable()
class CommentModel extends BaseModel<CommentModelAttributes, CommentModelCreationAttributes> {
  declare id: string
  declare memberId: ForeignKey<MemberModel['id']>
  declare postId: ForeignKey<PostModel['id']>
  declare parentId: ForeignKey<CommentModel['id']>
  declare text: string
  declare points: number

  declare countChild?: NonAttribute<number>

  // get countChild(): NonAttribute<number> {
  //   return this._countChild;
  // }

  // get countChild(): number {
  //   return this.att.countChild
  // }
}

CommentModel.init(commentInit, { modelName: DB_TABLES.COMMENT, sequelize })

export default CommentModel
