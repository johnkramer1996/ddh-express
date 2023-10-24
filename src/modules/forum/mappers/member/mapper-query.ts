import { injectable } from 'inversify'
import { MemberResponseDto } from '../../dtos/member/response.dto'
import { MemberModelAttributes, MemberModelWithAdditonAttributes } from '../../domain/entity/member/types'
import { MemberQuery } from '../../domain/entity/member/query'
import { QueryMapper } from '../comment/mapper-query'

@injectable()
export class MemberQueryMapper implements QueryMapper<MemberQuery, MemberModelAttributes, MemberResponseDto> {
  public toQuery(record: MemberModelWithAdditonAttributes): MemberQuery {
    return new MemberQuery({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      reputation: record.reputation,
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
      login: query.login,
      email: query.email,
    })
  }
}
