import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { TodoEntity } from '../../../domain/todo.entity'
import { CreateTodoCommand } from './create-todo.command'
import { Text } from '@src/modules/todo/domain/value-objects/text.value-object'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { TodoService } from '../../todo.service'

type Return = AggregateID
export type CreateTodoServiceResponse = ResultWithError<AggregateID>

@injectable()
@CommandHandler(CreateTodoCommand)
export class CreateTodoService extends TodoService<CreateTodoCommand, Return> {
  async executeImpl(command: CreateTodoCommand): Promise<Return> {
    const todo = TodoEntity.create({
      text: new Text({ value: command.text }),
      completed: command.completed,
    })

    await this.commentRepo.save(todo)

    return todo.id
  }
}
