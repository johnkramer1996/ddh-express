import { PaginatedResponseDto } from '../../../shared/api/paginated.response.base'
import { PostResponseDto } from './response.dto'

export class PostPaginatedResponseDto extends PaginatedResponseDto<PostResponseDto> {
  declare data: readonly PostResponseDto[]
}
