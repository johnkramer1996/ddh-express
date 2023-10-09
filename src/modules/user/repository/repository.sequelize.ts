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

  public async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.model.findOne({ where: { email } })
    return user ? this.mapper.toDomain(user) : user
  }

  public async restore(entity: UserEntity): Promise<boolean> {
    await this.model.restore({ where: { id: entity.id } })

    await entity.publishEvents()

    return true
  }
}
