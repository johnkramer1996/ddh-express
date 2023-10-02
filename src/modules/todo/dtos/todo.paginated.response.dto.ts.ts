import { PaginatedResponseDto } from '../../../shared/api/paginated.response.base'
import { TodoResponseDto } from './todo.response.dto'

export class TodoPaginatedResponseDto extends PaginatedResponseDto<TodoResponseDto> {
  declare data: readonly TodoResponseDto[]
}
