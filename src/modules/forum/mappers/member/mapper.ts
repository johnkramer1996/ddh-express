import { inject, injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { MemberResponseDto } from '../../dtos/member/response.dto'
import { MemberEntity } from '../../domain/entity/member/entity'
import { MemberModelAttributes } from '../../domain/entity/member/types'
import { USER_TYPES } from '@src/modules/user/di/user.types'
import { UserMapper } from '@src/modules/user/mappers/user.mapper'

@injectable()
export class MemberMapper implements Mapper<MemberEntity, MemberModelAttributes, MemberResponseDto> {
  constructor(@inject(USER_TYPES.MAPPER) protected userMapper: UserMapper) {}

  public toPersistence(entity: MemberEntity): MemberModelAttributes {
    const copy = entity.getProps()
    const record: MemberModelAttributes = {
      id: copy.id,
      userId: copy.userId,
      reputation: copy.reputation,
      isBanned: copy.isBanned,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      deletedAt: copy.deletedAt,
    }
    return record
  }

  public toDomain(record: MemberModelAttributes): MemberEntity {
    const entity = new MemberEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        userId: record.userId,
        reputation: record.reputation,
        isBanned: record.isBanned,
        login: record.user?.login,
        user: record.user ? this.userMapper.toDomain(record.user) : null,
      },
    })
    return entity
  }

  public toResponse(entity: MemberEntity): MemberResponseDto {
    const copy = entity.getProps()
    return new MemberResponseDto({ ...copy, email: copy.user?.email.value })
  }
}
