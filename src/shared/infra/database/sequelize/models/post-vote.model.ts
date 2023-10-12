import { Model, ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import UserModel from './user.model'
import { DB_TABLES } from '@src/configs/dbtables'
import PostModel from './post.model'
import postVoteInit from '../init/post-vote.init'
import { PostVoteModelAttributes, PostVoteModelCreationAttributes } from '@src/modules/forum/domain/entity/post-vote/types'

@injectable()
class PostVoteModel extends Model<PostVoteModelAttributes, PostVoteModelCreationAttributes> {
  declare id: string
  declare userId: ForeignKey<UserModel['id']>
  declare postId: ForeignKey<PostModel['id']>

  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date | null
}

PostVoteModel.init(postVoteInit, { modelName: DB_TABLES.POST_VOTE, sequelize })

export default PostVoteModel
