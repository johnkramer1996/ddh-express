import { inject, injectable } from 'inversify'
import { Result } from '../../../../../shared/core/result'
import { TodoRepositoryPort } from '../../../repository/repository.port'
import { getStringFromUnknown } from '../../../../../shared/utils/get-error'
import { UpdateTodoCommand } from './update-todo.command'
import { Text } from '@src/modules/todo/domain/value-objects/text.value-object'
import { TodoNotFoundException } from '@src/modules/todo/domain/todo.errors'
import { InternalServerErrorException } from '@src/shared/exceptions/exceptions'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'
import { IQueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'

export type UpdateTodoServiceResponse = Result<true> | Result<false, Error>

@injectable()
@CommandHandler(UpdateTodoCommand)
export class UpdateTodoService implements IQueryHandler<UpdateTodoCommand, UpdateTodoServiceResponse> {
  constructor(@inject(TODO_TYPES.REPOSITORY) private repository: TodoRepositoryPort) {}

  async execute(command: UpdateTodoCommand): Promise<UpdateTodoServiceResponse> {
    const todo = await this.repository.findOneById(command.todoId)
    if (!todo) return Result.fail(new TodoNotFoundException(command.todoId))

    if (command.text !== undefined) todo.updateText({ text: new Text({ value: command.text }) })
    if (command.completed !== undefined) todo.updateCompleted(command.completed)

    try {
      await this.repository.save(todo)

      return Result.ok<void>()
    } catch (err) {
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
