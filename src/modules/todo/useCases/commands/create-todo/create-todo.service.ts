import { inject, injectable } from 'inversify'
import { Result } from '../../../../../shared/core/result'
import { TYPES } from '../../../../../shared/infra/di/types'
import { TodoRepositoryPort } from '../../../repository/repository.port'
import { Paginated } from '../../../../../shared/domain/repository.port'
import { TodoEntity } from '../../../domain/todo.entity'
import { getStringFromUnknown } from '../../../../../shared/utils/get-error'
import { CreateTodoCommand } from './create-todo.command'
import { Text } from '@src/modules/todo/domain/value-objects/text.value-object'
import { AggregateID } from '@src/shared/domain/entity'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'

type Response = Result<true, AggregateID> | Result<false, Error>

@injectable()
export class CreateTodoService {
  constructor(@inject(TODO_TYPES.REPOSITORY) private repository: TodoRepositoryPort) {}

  async execute(command: CreateTodoCommand): Promise<Response> {
    const todo = TodoEntity.create({
      text: new Text({ value: command.text }),
      completed: command.completed,
    })

    try {
      await this.repository.save(todo)

      return Result.ok(todo.id)
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
