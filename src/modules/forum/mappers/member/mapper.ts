import { injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { VoteType } from '../../domain/entity/vote.base.entity'
import { MemberResponseDto } from '../../dtos/member/response.dto'
import { MemberEntity } from '../../domain/entity/member/entity'
import { MemberModelAttributes } from '../../domain/entity/member/types'

@injectable()
export class MemberMapper implements Mapper<MemberEntity, MemberModelAttributes, MemberResponseDto> {
  public toPersistence(entity: MemberEntity): MemberModelAttributes {
    const copy = entity.getProps()
    const record: MemberModelAttributes = {
      id: copy.id,
      userId: copy.userId,
      reputation: copy.reputation,
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
        login: record.user?.login,
        reputation: record.reputation,
      },
    })
    return entity
  }

  public toResponse(entity: MemberEntity): MemberResponseDto {
    const copy = entity.getProps()
    return new MemberResponseDto(copy)
  }
}
