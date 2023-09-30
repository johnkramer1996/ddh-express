import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ForeignKey,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
} from 'sequelize'
import { sequelize } from '../config/connection'
import UserModel from './user.model'

export type AddressAttributes = InferAttributes<AddressModel>
export type AddressCreationAttributes = InferCreationAttributes<AddressModel>

export class AddressModel extends Model<AddressAttributes, AddressCreationAttributes> {
  // declare id: CreationOptional<number>
  declare user_id: ForeignKey<UserModel['id']>
  declare country: string | null
  declare street: string | null

  // declare getUser: HasOneGetAssociationMixin<UserModel>
  // declare setUser: HasOneSetAssociationMixin<UserModel, string>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

AddressModel.init(
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    user_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: 'users',
          schema: 'public',
        },
        key: 'id',
      },
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'user_addresses',
    sequelize,
  }
)
