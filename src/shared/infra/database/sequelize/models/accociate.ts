import { AddressModel } from './address.model'
import CommentModel from './comment.model'
import MemberModel from './member.model'
import PostModel from './post.model'
import UserModel from './user.model'

export default function accociate() {
  UserModel.hasMany(CommentModel, {
    as: 'comments',
    sourceKey: 'id',
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  })
  CommentModel.belongsTo(UserModel, {
    as: 'user',
    targetKey: 'id',
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  })
  UserModel.hasMany(PostModel, { as: 'posts', sourceKey: 'id', foreignKey: 'user_id' })
  PostModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })
  // PostModel.hasMany(CommentModel, { as: 'posts', sourceKey: 'id', foreignKey: 'post_id' })
  // UserModel.hasOne(MemberModel, { as: 'member', sourceKey: 'id', foreignKey: 'user_id' })
  // UserModel.hasOne(AddressModel, { as: 'address', sourceKey: 'id', foreignKey: 'user_id' })
  // MemberModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })
  // AddressModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })
  // CommentModel.belongsTo(PostModel, { as: 'post', targetKey: 'id', foreignKey: 'post_id' })
}
