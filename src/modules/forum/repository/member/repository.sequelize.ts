import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase, SequelizeRepositoryQueryBase } from '../../../../shared/infra/database/sequelize/base.repository'
import { ModelDefined } from 'sequelize'
import { MemberRepositoryPort } from './repository.port'
import { MemberMapper } from '../../mappers/member/mapper-domain'
import { MemberEntity } from '../../domain/entity/member/entity'
import { MemberModelAttributes } from '../../domain/entity/member/types'
import { MEMBER_TYPES } from '../../di/member/types'
import { IncludeStrategyPort } from '@src/shared/domain/repository.port'
import { MemberUserByLoginIncludeStrategy } from './include-strategies/member.user-by-login.include-strategy'
import { MemberResponseDto } from '../../dtos/member/response.dto'
import { MemberQueryMapper } from '../../mappers/member/mapper-query'
import { MemberQuery } from '../../domain/entity/member/query'
import { MemberUserByIdIncludeStrategy as MemberUserIncludeStrategy } from './include-strategies/member.user-by-id.include-strategy'

@injectable()
export class MemberSequelizeRepository extends SequelizeRepositoryBase<MemberEntity, MemberModelAttributes> implements MemberRepositoryPort {
  constructor(@inject(MEMBER_TYPES.MAPPER) mapper: MemberMapper, @inject(MEMBER_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findOneByUserIdIfExists(userId?: string): Promise<MemberEntity | null> {
    if (!userId) return null
    return this.findOne({ where: { userId } })
  }

  public async findOneByUserId(userId: string): Promise<MemberEntity | null> {
    return this.findOne({ where: { userId } })
  }

  public async findOneByLogin(login: string): Promise<MemberEntity | null> {
    const includeStrategies: IncludeStrategyPort[] = []

    includeStrategies.push(new MemberUserByLoginIncludeStrategy(login))
    const entity = await this.findOne({ includeStrategies })

    return entity
  }
}

@injectable()
export class MemberSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<MemberQuery, MemberModelAttributes, MemberResponseDto> {
  constructor(@inject(MEMBER_TYPES.QUERY_MAPPER) mapper: MemberQueryMapper, @inject(MEMBER_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findOneByUserIdIfExists(userId?: string): Promise<MemberQuery | null> {
    if (!userId) return null
    return this.findOneByUserId(userId)
  }

  public async findOneByUserId(userId: string): Promise<MemberQuery | null> {
    const includeStrategies: IncludeStrategyPort[] = []

    includeStrategies.push(new MemberUserIncludeStrategy())

    return this.findOne({ where: { userId }, includeStrategies })
  }

  public async findOneByLogin(login: string): Promise<MemberQuery | null> {
    const includeStrategies: IncludeStrategyPort[] = []

    includeStrategies.push(new MemberUserByLoginIncludeStrategy(login))

    return await this.findOne({ includeStrategies })
  }
}
