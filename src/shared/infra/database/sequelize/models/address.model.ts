import { ForeignKey } from 'sequelize'
import { sequelize } from '../config/connection'
import { AddressModelAttributes, AddressModelCreationAttributes } from '@src/modules/user/domain/value-objects/address.value-object'
import userAdderessInit from '../init/user-adderess.init'
import { BaseModel } from './base.model'
import { DB_TABLES } from '@src/configs/dbtables'
import { UserModel } from './user.model'

class AddressModel extends BaseModel<AddressModelAttributes, AddressModelCreationAttributes> {
  declare userId: ForeignKey<UserModel['id']>
  declare country: string | null
  declare postalCode: string | null
  declare street: string | null
}

AddressModel.init(userAdderessInit, { tableName: DB_TABLES.USER_ADDRESS, sequelize })

export default AddressModel
