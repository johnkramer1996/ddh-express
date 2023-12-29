import { inject, injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { MemberResponseDto } from '../../dtos/member/member.response.dto'
import { MemberEntity } from '../../domain/entity/member/member.entity'
import { MemberModelAttributes } from '../../domain/entity/member/member.types'
import { Role } from '@src/modules/forum/domain/value-objects/role.value-object'
import { Roles } from '../../domain/value-objects/roles.value-object'

@injectable()
export class MemberMapper implements Mapper<MemberEntity, MemberModelAttributes> {
  public toPersistence(entity: MemberEntity): MemberModelAttributes {
    const copy = entity.getProps()
    const record: MemberModelAttributes = {
      id: copy.id,
      userId: copy.userId,
      reputation: copy.reputation,
      isBanned: copy.isBanned,
      lastActiveAt: copy.lastActiveAt,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      deletedAt: copy.deletedAt,
    }
    return record
  }

  public toDomain(record: MemberModelAttributes): MemberEntity {
    const entity = new MemberEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        userId: record.userId,
        roles: new Roles(record.roles ? record.roles.map((p) => new Role({ value: p.role })) : []),
        reputation: record.reputation,
        isBanned: record.isBanned,
        lastActiveAt: record.lastActiveAt,
      },
    })
    return entity
  }
}
