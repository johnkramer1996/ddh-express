import { PaginatedResponseDto } from '@src/shared/api/paginated.response.base'
import { CommentResponseDto } from './response.dto'

export class CommentPaginatedResponseDto extends PaginatedResponseDto<CommentResponseDto> {
  declare data: readonly CommentResponseDto[]
}
