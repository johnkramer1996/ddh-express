import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { UserCreateCommand } from './command'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { Password } from '@src/modules/user/domain/value-objects/password.value-object'
import { UserService } from '../../base.service'
import { UserAlreadyExistsError } from '@src/modules/user/domain/user.errors'

type Return = AggregateID
export type UserCreateServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(UserCreateCommand)
export class UserCreateService extends UserService<UserCreateCommand, Return> {
  async executeImpl(command: UserCreateCommand): Promise<Return> {
    const existsUser = await this.userRepo.findOneByEmail(command.email)
    if (existsUser) throw new UserAlreadyExistsError()

    const user = UserEntity.create({
      email: command.email,
      password: new Password({ value: command.password }),
    })

    await this.userRepo.save(user)

    return user.id
  }
}
