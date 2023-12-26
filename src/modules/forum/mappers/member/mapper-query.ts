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
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      reputation: record.reputation,
      avatar: record.user.avatar,
      login: record.user.login,
      email: record.user.email,
      lastActiveAt: record.lastActiveAt,
      isBanned: record.isBanned,
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
      isOnline: query.isOnline,
      isBanned: query.isBanned,
    })
  }
}
