import { PaginatedResponseDto } from '@src/shared/api/paginated.response.base'
import { MemberResponseDto } from './member.response.dto'

export class MemberPaginatedResponseDto extends PaginatedResponseDto<MemberResponseDto> {
  declare data: readonly MemberResponseDto[]
}
