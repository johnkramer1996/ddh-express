import { inject, injectable } from 'inversify'
import { SequelizeRepositoryAggregateBase, SequelizeRepositoryBase } from '../../../shared/infra/database/sequelize/base.repository'
import { UserEntity } from '../domain/user.entity'
import { UserModelAttributes } from '../domain/user.types'
import { UserRepositoryPort } from './repository.port'
import { UserMapper } from '../mappers/user/mapper-domain'
import { ModelDefined } from 'sequelize'
import { USER_TYPES } from '../di/user.types'
import AddressModel from '@src/shared/infra/database/sequelize/models/address.model'
import { v4 } from 'uuid'

@injectable()
export class UserSequelizeRepository extends SequelizeRepositoryAggregateBase<UserEntity, UserModelAttributes> implements UserRepositoryPort {
  constructor(
    @inject(USER_TYPES.MAPPER) mapper: UserMapper,
    @inject(USER_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>,
    @inject(USER_TYPES.SEQUELIZE_ADDRESS_MODEL) private addressModel: typeof AddressModel
  ) {
    super(mapper, model)
  }

  public async findOneByIdWithDeleted(id: string): Promise<UserEntity | null> {
    const user = await this.model.findOne({ where: { id }, paranoid: true })
    return user ? this.mapper.toDomain(user) : null
  }

  public async findOneByEmailOrLogin(email: string, login: string): Promise<UserEntity | null> {
    return this.findOne({ where: { email, login } })
  }

  public async findOneByLogin(login: string): Promise<UserEntity | null> {
    return this.findOne({ where: { login } })
  }

  public async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.findOne({ where: { email } })
  }

  public async restore(entity: UserEntity): Promise<void> {
    await this.model.restore({ where: { id: entity.id } })

    await entity.publishEvents()
  }

  public async save(entity: UserEntity) {
    await super.save(entity)
    await this.saveAddress(entity)
  }

  private async saveAddress(entity: UserEntity) {
    const found = await this.addressModel.findOne({ where: { userId: entity.id } })
    const address = entity.address
    const rawSequelizeAddress = {
      country: address.country,
      postalCode: address.postalCode,
      street: address.street,
    }

    found
      ? await this.addressModel.update(rawSequelizeAddress, { where: { id: found.id } })
      : await this.addressModel.create({ ...rawSequelizeAddress, id: v4(), userId: entity.id })
  }
}
