import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../shared/infra/database/sequelize/base.repository'
import { UserEntity } from '../domain/user.entity'
import { UserModelAttributes } from '../domain/user.types'
import { UserRepositoryPort } from './repository.port'
import { UserMapper } from '../mappers/user.mapper'
import { ModelDefined } from 'sequelize'
import { USER_TYPES } from '../di/user.types'

@injectable()
export class UserSequelizeRepository extends SequelizeRepositoryBase<UserEntity, UserModelAttributes> implements UserRepositoryPort {
  constructor(@inject(USER_TYPES.MAPPER) mapper: UserMapper, @inject(USER_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
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
}
