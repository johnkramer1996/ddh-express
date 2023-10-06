import { DataTypes, Model, ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { TimeStamp } from '../../../../core/time-stamp'
import { AddressModelAttributes, AddressModelCreationAttributes } from '@src/modules/user/domain/value-objects/address.value-object'
import UserModel from './user.model'
import userAdderessInit from '../init/user-adderess.init'

export class AddressModel extends Model<Omit<AddressModelAttributes, 'userId'>, AddressModelCreationAttributes> {
  declare userId: ForeignKey<UserModel['id']>
  declare country: string | null
  declare postalCode: string | null
  declare street: string | null

  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date | null
}

AddressModel.init(userAdderessInit, {
  tableName: 'user_addresses',
  sequelize,
})
