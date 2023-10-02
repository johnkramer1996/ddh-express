import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Association,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  NonAttribute,
} from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { AddressAttributes, AddressModel } from './address.model'
import { UserModelAttributes, UserModelCreationAttributes } from '@src/modules/user/domain/user.entity'

@injectable()
class UserModel extends Model<UserModelAttributes, UserModelCreationAttributes> {
  declare id: CreationOptional<string>
  declare email: string
  declare password: string
  declare username: string | null
  declare is_email_verified: boolean
  declare is_admin_user: boolean
  declare is_deleted: boolean
  declare last_login: Date | null

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare getAddress: HasOneGetAssociationMixin<AddressModel>
  declare setddress: HasOneSetAssociationMixin<AddressModel, number>
  declare createAddress: HasOneCreateAssociationMixin<AddressModel>

  declare static associations: {
    address: Association<UserModel, AddressModel>
  }
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
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_admin_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'users',
    sequelize,
    defaultScope: {
      include: [{ model: AddressModel, as: 'address' }],
    },
  }
)

UserModel.hasOne(AddressModel, { as: 'address', sourceKey: 'id', foreignKey: 'user_id' })
AddressModel.belongsTo(UserModel, { as: 'user', targetKey: 'id', foreignKey: 'user_id' })

export default UserModel
