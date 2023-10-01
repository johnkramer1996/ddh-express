import { inject, injectable } from 'inversify'
import { Result } from '../../../../../shared/core/result'
import { TodoRepositoryPort } from '../../../repository/repository.port'
import { TodoEntity } from '../../../domain/todo.entity'
import { getStringFromUnknown } from '../../../../../shared/utils/get-error'
import { CreateTodoCommand } from './create-todo.command'
import { Text } from '@src/modules/todo/domain/value-objects/text.value-object'
import { AggregateID } from '@src/shared/domain/entity'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'
import { CommandHandler, ICommandHandler } from '@src/shared/core/cqs/command-handler'

export type CreateTodoServiceResponse = Result<true, AggregateID> | Result<false, Error>

@injectable()
@CommandHandler(CreateTodoCommand)
export class CreateTodoService implements ICommandHandler<CreateTodoCommand, CreateTodoServiceResponse> {
  constructor(@inject(TODO_TYPES.REPOSITORY) private repository: TodoRepositoryPort) {}

  async execute(command: CreateTodoCommand): Promise<CreateTodoServiceResponse> {
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
