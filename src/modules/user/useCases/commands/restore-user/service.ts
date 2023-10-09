import { injectable } from 'inversify'
import { ResultWithError } from '../../../../../shared/core/result'
import { RecoverUserCommand } from './command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { UserService } from '../../base.service'

type Return = void
export type RecoverUserServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(RecoverUserCommand)
export class RecoverUserService extends UserService<RecoverUserCommand, Return> {
  async executeImpl(command: RecoverUserCommand): Promise<Return> {
    const user = await this.userRepo.findOneById(command.userId, true)
    if (!user) throw new NotFoundException()

    user.restore()

    await this.userRepo.restore(user)
  }
}
