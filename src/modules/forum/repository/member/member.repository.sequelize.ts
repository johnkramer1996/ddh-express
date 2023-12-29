import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../../shared/infra/database/sequelize/base.repository'
import { ModelDefined } from 'sequelize'
import { MemberRepositoryPort } from './member.repository.port'
import { MemberMapper } from '../../mappers/member/mapper-domain'
import { MemberEntity } from '../../domain/entity/member/member.entity'
import { MemberModelAttributes } from '../../domain/entity/member/member.types'
import { MEMBER_TYPES } from '../../di/member/member.types'
import { IncludeStrategyPort } from '@src/shared/domain/repository.port'
import { MemberUserByLoginIncludeStrategy } from './include-strategies/member.user-by-login.include-strategy'
import { USER_TYPES } from '@src/modules/user/di/user.types'
import { MemberRoleModel } from '@src/shared/infra/database/sequelize/models/member-role.model'

@injectable()
export class MemberSequelizeRepository extends SequelizeRepositoryBase<MemberEntity, MemberModelAttributes> implements MemberRepositoryPort {
  constructor(
    @inject(MEMBER_TYPES.MAPPER) mapper: MemberMapper,
    @inject(MEMBER_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>,
    @inject(MEMBER_TYPES.SEQUELIZE_ROLE_MODEL) private memberRoleModel: typeof MemberRoleModel
  ) {
    super(mapper, model)
  }

  public async findOneByUserIdIfExists(userId?: string): Promise<MemberEntity | null> {
    if (!userId) return null
    return this.findOneByUserId(userId)
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

  public async save(entity: MemberEntity) {
    await super.save(entity)
    await this.saveRoles(entity)
    await this.deleteRoles(entity)
  }

  private async saveRoles(entity: MemberEntity) {
    const roles = entity.roles

    for (const role of roles.getNewItems()) {
      const found = await this.memberRoleModel.findOne({ where: { memberId: entity.id, role: role.value } })
      if (found) continue

      const rawSequelizeEntity = { memberId: entity.id, role: role.value }

      await this.memberRoleModel.create(rawSequelizeEntity)
    }
  }

  private async deleteRoles(entity: MemberEntity) {
    const roles = entity.roles

    for (const role of roles.getRemovedItems()) {
      await this.memberRoleModel.destroy({ where: { memberId: entity.id, role: role.value } })
    }
  }
}
