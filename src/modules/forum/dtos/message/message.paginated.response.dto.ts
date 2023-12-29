import { PaginatedResponseDto } from '../../../../shared/api/paginated.response.base'
import { MessageResponseDto } from './message.response.dto'

export class MessagePaginatedResponseDto extends PaginatedResponseDto<MessageResponseDto> {
  declare data: readonly MessageResponseDto[]
}
