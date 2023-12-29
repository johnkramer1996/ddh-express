import { DataTypes, Model, Association, HasOneGetAssociationMixin, HasOneSetAssociationMixin, HasOneCreateAssociationMixin, NonAttribute } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { UserModelAttributes, UserModelCreationAttributes } from '@src/modules/user/domain/user.types'
import { DB_TABLES } from '@src/configs/dbtables'
import userInit from '../init/user.init.js'
import { AddressModel } from './address.model'

@injectable()
export class UserModel extends Model<UserModelAttributes, UserModelCreationAttributes> {
  declare id: string
  declare avatar: string | null
  declare email: string
  declare password: string
  declare username: string | null
  declare isEmailVerified: boolean
  declare isDeleted: boolean
  declare lastLogin: Date | null

  declare createdAt: Date
  declare updatedAt: Date | null
}

UserModel.init(userInit, {
  modelName: DB_TABLES.USER,
  sequelize,
  defaultScope: {
    include: [{ as: 'address', model: AddressModel }],
  },
})
