import { DataTypes, Model, Association, HasOneGetAssociationMixin, HasOneSetAssociationMixin, HasOneCreateAssociationMixin, NonAttribute } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { UserModelAttributes, UserModelCreationAttributes } from '@src/modules/user/domain/user.types'
import PostModel from './post.model'
import { DB_TABLES } from '@src/configs/dbtables'
import userInit from '../init/user.init.js'
import AddressModel from './address.model'

@injectable()
class UserModel extends Model<UserModelAttributes, UserModelCreationAttributes> {
  declare id: string
  declare email: string
  declare password: string
  declare username: string | null
  declare isEmailVerified: boolean
  declare isAdminUser: boolean
  declare isDeleted: boolean
  declare lastLogin: Date | null

  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date | null

  // declare getAddress: HasOneGetAssociationMixin<AddressModel>
  // declare setddress: HasOneSetAssociationMixin<AddressModel, number>
  // declare createAddress: HasOneCreateAssociationMixin<AddressModel>

  // declare comments?: NonAttribute<CommentModel[]>
  declare posts?: NonAttribute<PostModel[]>

  // declare static associations: {
  //   address: Association<UserModel, AddressModel>
  //   comments: Association<UserModel, CommentModel>
  // }
}

UserModel.init(userInit, {
  tableName: DB_TABLES.USER,
  sequelize,
  defaultScope: {
    include: [{ model: AddressModel, as: 'address' }],
  },
  hooks: {},
})

export default UserModel
