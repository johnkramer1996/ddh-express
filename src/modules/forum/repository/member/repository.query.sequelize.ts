import { inject, injectable } from 'inversify'
import { SequelizeRepositoryQueryBase } from '@src/shared/infra/database/sequelize/base-query.repository'
import { ModelDefined } from 'sequelize'
import { MEMBER_TYPES } from '../../di/member/types'
import { IncludeStrategyPort } from '@src/shared/domain/repository.port'
import { MemberUserByLoginIncludeStrategy } from './include-strategies/member.user-by-login.include-strategy'
import { MemberQueryMapper } from '../../mappers/member/mapper-query'
import { MemberQuery } from '../../domain/entity/member/query'
import { MemberRepositoryQueryPort } from './repository.port'

@injectable()
export class MemberSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<MemberQuery> implements MemberRepositoryQueryPort {
  constructor(@inject(MEMBER_TYPES.QUERY_MAPPER) mapper: MemberQueryMapper, @inject(MEMBER_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findOneByUserIdIfExists(userId?: string): Promise<MemberQuery | null> {
    if (!userId) return null
    return this.findOneByUserId(userId)
  }

  public async findOneByUserId(userId: string): Promise<MemberQuery | null> {
    // const includeStrategies: IncludeStrategyPort[] = []

    return this.findOne({ where: { userId } })
  }

  public async findOneByLogin(login: string): Promise<MemberQuery | null> {
    const includeStrategies: IncludeStrategyPort[] = []

    includeStrategies.push(new MemberUserByLoginIncludeStrategy(login))

    return await this.findOne({ includeStrategies })
  }
}
