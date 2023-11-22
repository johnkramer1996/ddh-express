import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { CreateUserCommand as CreateUserCommand } from './command'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { Password } from '@src/modules/user/domain/value-objects/password.value-object'
import { UserServiceBase } from '../../base.service'
import { UserAlreadyExistsError } from '@src/modules/user/domain/user.errors'
import { Login } from '@src/modules/user/domain/value-objects/login.value-object'
import { Email } from '@src/modules/user/domain/value-objects/email.value-object'

type Return = AggregateID
export type CreateUserServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserService extends UserServiceBase<CreateUserCommand, Return> {
  async executeImpl(command: CreateUserCommand): Promise<Return> {
    const existsLogin = await this.userRepo.findOneByLogin(command.login)
    if (existsLogin) throw new UserAlreadyExistsError('Login already exists')

    const existsEmail = await this.userRepo.findOneByEmail(command.email)
    if (existsEmail) throw new UserAlreadyExistsError('Email already exists')

    const user = UserEntity.create({
      login: Login.create({ value: command.login }),
      email: Email.create({ value: command.email }),
      password: Password.create({ value: command.password }),
    })

    await this.userRepo.save(user)

    return user.id
  }
}
