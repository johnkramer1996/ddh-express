import { PaginatedResponseDto } from '../../../shared/api/paginated.response.base'
import { UserResponseDto } from './user.response.dto'

export class UserPaginatedResponseDto extends PaginatedResponseDto<UserResponseDto> {
  declare data: readonly UserResponseDto[]
}
