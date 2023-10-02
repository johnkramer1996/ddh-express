import { injectable } from 'inversify'
import { Mapper } from '../../../shared/domain/mapper.interface'
import { TodoResponseDto } from '../dtos/todo.response.dto'
import { TodoEntity } from './todo.entity'
import { TodoModelAttributes } from './todo.types'
import { Text } from './value-objects/text.value-object'

@injectable()
export class TodoMapper implements Mapper<TodoEntity, TodoModelAttributes, TodoResponseDto> {
  public toPersistence(entity: TodoEntity): TodoModelAttributes {
    const copy = entity.getProps()
    const record: TodoModelAttributes = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      text: copy.text.value,
      completed: copy.completed,
    }
    return record
  }

  public toDomain(record: TodoModelAttributes): TodoEntity {
    const entity = new TodoEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        completed: record.completed,
        text: new Text({ value: record.text }),
      },
    })
    return entity
  }

  public toResponse(entity: TodoEntity): TodoResponseDto {
    const copy = entity.getProps()
    return new TodoResponseDto({ ...copy, text: copy.text.value })
  }
}
