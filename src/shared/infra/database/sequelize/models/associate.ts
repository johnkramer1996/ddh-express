import AddressModel from './address.model'
import CommentVoteModel from './comment-vote.model'
import CommentModel from './comment.model'
import MemberModel from './member.model'
import PostVoteModel from './post-vote.model'
import PostModel from './post.model'
import UserModel from './user.model'

export default function associate() {
  UserModel.hasOne(MemberModel, { as: 'member', sourceKey: 'id', foreignKey: 'userId' })
  UserModel.hasOne(AddressModel, { as: 'address', sourceKey: 'id', foreignKey: 'userId' })

  AddressModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'userId' })

  MemberModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'userId' })
  MemberModel.hasMany(CommentModel, { as: 'comments', sourceKey: 'id', foreignKey: 'memberId' })
  MemberModel.hasMany(PostModel, { as: 'posts', sourceKey: 'id', foreignKey: 'memberId' })
  MemberModel.hasMany(PostVoteModel, { as: 'post_votes', sourceKey: 'id', foreignKey: 'memberId' })
  MemberModel.hasMany(CommentVoteModel, { as: 'comment_votes', sourceKey: 'id', foreignKey: 'memberId' })

  PostModel.hasMany(PostVoteModel, { as: 'votes', sourceKey: 'id', foreignKey: 'postId' })
  PostModel.hasMany(CommentModel, { as: 'comments', sourceKey: 'id', foreignKey: 'postId' })
  PostModel.belongsTo(MemberModel, { as: 'user', targetKey: 'id', foreignKey: 'memberId' })

  CommentModel.belongsTo(CommentModel, { as: 'parent', targetKey: 'id', foreignKey: 'parentId' })
  CommentModel.belongsTo(MemberModel, { as: 'user', targetKey: 'id', foreignKey: 'memberId' })
  CommentModel.belongsTo(PostModel, { as: 'post', targetKey: 'id', foreignKey: 'postId' })
  CommentModel.hasMany(CommentVoteModel, { as: 'votes', sourceKey: 'id', foreignKey: 'comment_id' })
}
