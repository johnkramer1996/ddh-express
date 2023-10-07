import CommentVoteModel from './comment-vote.model'
import CommentModel from './comment.model'
import PostVoteModel from './post-vote.model'
import PostModel from './post.model'
import UserModel from './user.model'

export default function associate() {
  UserModel.hasMany(CommentModel, { as: 'comments', sourceKey: 'id', foreignKey: { name: 'user_id', allowNull: false } })
  UserModel.hasMany(PostModel, { as: 'posts', sourceKey: 'id', foreignKey: 'user_id' })
  UserModel.hasMany(PostVoteModel, { as: 'post_votes', sourceKey: 'id', foreignKey: 'post_id' })
  UserModel.hasMany(CommentVoteModel, { as: 'comment_votes', sourceKey: 'id', foreignKey: 'post_id' })

  PostModel.hasMany(PostVoteModel, { as: 'votes', sourceKey: 'id', foreignKey: 'user_id' })
  PostModel.hasMany(CommentModel, { as: 'posts', sourceKey: 'id', foreignKey: 'post_id' })
  PostModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })

  CommentModel.hasMany(CommentVoteModel, { as: 'votes', sourceKey: 'id', foreignKey: 'post_id' })
  CommentModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: { name: 'user_id', allowNull: false } })
  CommentModel.belongsTo(PostModel, { as: 'post', targetKey: 'id', foreignKey: 'post_id' })

  // PostVoteModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })
  // PostVoteModel.belongsTo(PostModel, { as: 'post', targetKey: 'id', foreignKey: 'post_id' })
  // PostVoteModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })
  // PostVoteModel.belongsTo(PostModel, { as: 'post', targetKey: 'id', foreignKey: 'post_id' })

  // UserModel.hasOne(MemberModel, { as: 'member', sourceKey: 'id', foreignKey: 'user_id' })
  // UserModel.hasOne(AddressModel, { as: 'address', sourceKey: 'id', foreignKey: 'user_id' })
  // MemberModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })
  // AddressModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })
}
