import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { CreateUserCommand } from './create-user.command'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { Password } from '@src/modules/user/domain/value-objects/password.value-object'
import { UserService } from '../../base.service'

type Return = AggregateID
export type CreateUserServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserService extends UserService<CreateUserCommand, Return> {
  async executeImpl(command: CreateUserCommand): Promise<Return> {
    const todo = UserEntity.create({
      email: command.email,
      password: new Password({ value: command.password }),
    })

    await this.commentRepo.save(todo)

    return todo.id
  }
}
