import { Model, ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { DB_TABLES } from '@src/configs/dbtables'
import CommentModel from './comment.model'
import { CommentVoteModelAttributes, CommentVoteModelCreationAttributes } from '@src/modules/forum/domain/entity/comment-vote/types'
import commentVoteInit from '../init/comment-vote.init'
import { BaseModel } from './base.model'
import MemberModel from './member.model'

@injectable()
class CommentVoteModel extends BaseModel<CommentVoteModelAttributes, CommentVoteModelCreationAttributes> {
  declare id: string
  declare memberId: ForeignKey<MemberModel['id']>
  declare commentId: ForeignKey<CommentModel['id']>

  declare createdAt: Date
  declare updatedAt: Date
}

CommentVoteModel.init(commentVoteInit, { tableName: DB_TABLES.COMMENT_VOTE, sequelize })

export default CommentVoteModel
