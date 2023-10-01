import { ResponseBase } from '@src/shared/api/response.base'
import { PaginatedResponseDto } from '../../../shared/api/paginated.response.base'
import { TodoResponseDto } from './todo.response.dto'

export class TodoPaginatedResponseDto extends PaginatedResponseDto<TodoResponseDto> {
  declare data: readonly TodoResponseDto[]

  // constructor(props: Paginated<TodoEntity>) {
  //   const data = props.data.map((todo) => ({
  //     ...new ResponseBase(todo),
  //     text: todo.text,
  //     completed: todo.completed,
  //   }))
  //   super({ ...props, data })
  // }
}
