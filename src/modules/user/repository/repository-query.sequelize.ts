import { SequelizeRepositoryQueryBase } from '@src/shared/infra/database/sequelize/base-query.repository'
import { ModelDefined } from 'sequelize'
import { QueryParams } from '@src/shared/domain/repository.port'
import { inject, injectable } from 'inversify'
import { UserModelAttributes } from '../domain/user.types'
import { UserResponseDto } from '../dtos/user.response.dto'
import { USER_TYPES } from '../di/user.types'
import { UserQuery } from '../domain/user.query'
import { UserQueryMapper } from '../mappers/user/mapper-query'

export interface FindCommentsParams extends QueryParams {}

@injectable()
export class UserSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<UserQuery, UserModelAttributes, UserResponseDto> {
  constructor(@inject(USER_TYPES.QUERY_MAPPER) mapper: UserQueryMapper, @inject(USER_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findOneByLogin(login: string): Promise<UserQuery | null> {
    return this.findOne({ where: { login } })
  }
}
