import { DataTypes, Model, Association, HasOneGetAssociationMixin, HasOneSetAssociationMixin, HasOneCreateAssociationMixin, NonAttribute } from 'sequelize'
import { sequelize } from '../config/connection'
import { TimeStamp } from '../../../../core/time-stamp'
import { injectable } from 'inversify'
import { UserModelAttributes, UserModelCreationAttributes } from '@src/modules/user/domain/user.types'
import CommentModel from './comment.model'

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

  // declare getAddress: HasOneGetAssociationMixin<AddressModel>
  // declare setddress: HasOneSetAssociationMixin<AddressModel, number>
  // declare createAddress: HasOneCreateAssociationMixin<AddressModel>

  declare comments?: NonAttribute<CommentModel[]>

  // declare static associations: {
  //   address: Association<UserModel, AddressModel>
  //   comments: Association<UserModel, CommentModel>
  // }
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isEmailVerified: {
      // field: 'is_email_verified',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isAdminUser: {
      // field: 'is_admin_user',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDeleted: {
      // field: 'is_deleted',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastLogin: {
      // field: 'last_login',
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      // field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      // field: 'updated_at',
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'users',
    sequelize,
    defaultScope: {
      // include: [{ model: AddressModel, as: 'address' }],
    },
    hooks: {},
  }
)

export default UserModel
