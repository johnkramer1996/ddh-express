import { injectable } from 'inversify'
import { Mapper } from '../../../shared/domain/mapper.interface'
import { TodoAttributes } from '../../../shared/infra/database/sequelize/models/todo.model'
import { TodoResponseDto } from '../dtos/todo.response.dto'
import { TodoEntity } from './todo.entity'
import { Text } from './value-objects/text.value-object'

@injectable()
export class TodoMapper implements Mapper<TodoEntity, TodoAttributes, TodoResponseDto> {
  public toPersistence(entity: TodoEntity): TodoAttributes {
    const copy = entity.getProps()
    const record: TodoAttributes = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      text: copy.text.value,
      completed: copy.completed,
    }
    return record
  }

  public toDomain(record: TodoAttributes): TodoEntity {
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
    return new TodoResponseDto(entity)
  }
}
