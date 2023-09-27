import { inject, injectable } from 'inversify'
import { Result } from '../../../../../shared/core/result'
import { TYPES } from '../../../../../shared/infra/di/types'
import { TodoRepositoryPort } from '../../../repository/repository.port'
import { Paginated } from '../../../../../shared/domain/repository.port'
import { TodoEntity } from '../../../domain/todo.entity'
import { getStringFromUnknown } from '../../../../../shared/utils/get-error'
import { CreateUserCommand } from './create-todo.command'
import { Text } from '@src/modules/todo/domain/value-objects/text.value-object'
import { AggregateID } from '@src/shared/domain/entity'

type Response = Result<true, AggregateID> | Result<false, Error>

@injectable()
export class CreateTodoService {
  constructor(@inject(TYPES.TODO_REPOSITORY) private repository: TodoRepositoryPort) {}

  async execute(command: CreateUserCommand): Promise<Response> {
    const todo = TodoEntity.create({
      text: new Text({ value: command.text }),
      completed: command.completed,
    })

    try {
      await this.repository.save(todo)

      return Result.ok(todo.id)
    } catch (err) {
      return Result.fail(new Error(getStringFromUnknown(err)))
    }
  }
}
