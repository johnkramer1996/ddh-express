import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../../shared/infra/database/sequelize/base.repository'
import { ModelDefined } from 'sequelize'
import { MemberRepositoryPort } from './repository.port'
import { MemberMapper } from '../../mappers/member/mapper'
import { MemberEntity } from '../../domain/entity/member/entity'
import { MemberModelAttributes } from '../../domain/entity/member/types'
import { MEMBER_TYPES } from '../../di/member/types'
import { IncludeStrategyPort } from '@src/shared/domain/repository.port'
import { MemberUserIncludeStrategy } from './include-strategies/member.user.include-strategy'

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

  public async findOneByLoginDetail(login: string): Promise<MemberEntity | null> {
    const includeStrategies: IncludeStrategyPort[] = []

    includeStrategies.push(new MemberUserIncludeStrategy(login))
    const entity = await this.findOne({ includeStrategies })

    return entity
  }
}
