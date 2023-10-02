import { DataTypes, Model, ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { TimeStamp } from '../../../../core/time-stamp'
import { AddressAttributes, AddressCreationAttributes } from '@src/modules/user/domain/value-objects/address.value-object'
import UserModel from './user.model'

export class AddressModel extends Model<Omit<AddressAttributes, 'userId'>, AddressCreationAttributes> {
  declare userId: ForeignKey<UserModel['id']>
  declare country: string | null
  declare postalCode: string | null
  declare street: string | null
  declare createdAt: Date
  declare updatedAt: Date
}

AddressModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'user_addresses',
    sequelize,
  }
)
