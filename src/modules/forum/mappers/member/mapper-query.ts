import { injectable } from 'inversify'
import { QueryMapper } from '../../../../shared/domain/mapper-query.interface'
import { MemberQuery } from '../../domain/entity/member/query'
import { MemberModelAttributes } from '../../domain/entity/member/types'
import { MemberResponseDto } from '../../dtos/member/response.dto'

@injectable()
export class MemberQueryMapper implements QueryMapper<MemberQuery, MemberModelAttributes, MemberResponseDto> {
  public toQuery(record: MemberModelAttributes): MemberQuery {
    if (!record.user) throw new Error('Include user to member is required')
    return new MemberQuery({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      reputation: record.reputation,
      avatar: record.user.avatar,
      login: record.user.login,
      email: record.user.email,
    })
  }

  public toResponse(query: MemberQuery): MemberResponseDto {
    return new MemberResponseDto({
      id: query.id,
      createdAt: query.createdAt,
      updatedAt: query.updatedAt,
      reputation: query.reputation,
      avatar: query.avatar,
      login: query.login,
      email: query.email,
    })
  }
}
