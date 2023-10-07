import { Model, ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import UserModel from './user.model'
import { DB_TABLES } from '@src/configs/dbtables'
import CommentModel from './comment.model'
import { CommentVoteModelAttributes, CommentVoteModelCreationAttributes } from '@src/modules/forum/domain/entity/comment-vote/types'
import commentVoteInit from '../init/comment-vote.init'
import { BaseModel } from './base.model'

@injectable()
class CommentVoteModel extends BaseModel<CommentVoteModelAttributes, CommentVoteModelCreationAttributes> {
  declare userId: ForeignKey<UserModel['id']>
  declare commentId: ForeignKey<CommentModel['id']>
}

CommentVoteModel.init(commentVoteInit, { tableName: DB_TABLES.COMMENT_VOTE, sequelize })

export default CommentVoteModel
