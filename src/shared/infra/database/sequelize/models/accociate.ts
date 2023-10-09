import AddressModel from './address.model'
import CommentVoteModel from './comment-vote.model'
import CommentModel from './comment.model'
import PostVoteModel from './post-vote.model'
import PostModel from './post.model'
import UserModel from './user.model'

export default function associate() {
  UserModel.hasMany(CommentModel, { as: 'comments', sourceKey: 'id', foreignKey: 'userId' })
  UserModel.hasMany(PostModel, { as: 'posts', sourceKey: 'id', foreignKey: 'userId' })
  UserModel.hasMany(PostVoteModel, { as: 'post_votes', sourceKey: 'id', foreignKey: 'postId' })
  UserModel.hasMany(CommentVoteModel, { as: 'comment_votes', sourceKey: 'id', foreignKey: 'commentId' })
  UserModel.hasOne(AddressModel, { as: 'address', sourceKey: 'id', foreignKey: 'userId' })

  AddressModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'userId' })

  PostModel.hasMany(PostVoteModel, { as: 'votes', sourceKey: 'id', foreignKey: 'postId' })
  PostModel.hasMany(CommentModel, { as: 'comments', sourceKey: 'id', foreignKey: 'postId' })
  PostModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'userId' })

  CommentModel.belongsTo(CommentModel, { as: 'parent', targetKey: 'id', foreignKey: 'parentId' })
  CommentModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'userId' })
  CommentModel.belongsTo(PostModel, { as: 'post', targetKey: 'id', foreignKey: 'postId' })
  CommentModel.hasMany(CommentVoteModel, { as: 'votes', sourceKey: 'id', foreignKey: 'comment_id' })

  // PostVoteModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })
  // PostVoteModel.belongsTo(PostModel, { as: 'post', targetKey: 'id', foreignKey: 'post_id' })
  // PostVoteModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })
  // PostVoteModel.belongsTo(PostModel, { as: 'post', targetKey: 'id', foreignKey: 'post_id' })

  // UserModel.hasOne(MemberModel, { as: 'member', sourceKey: 'id', foreignKey: 'user_id' })
  // MemberModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })
}
