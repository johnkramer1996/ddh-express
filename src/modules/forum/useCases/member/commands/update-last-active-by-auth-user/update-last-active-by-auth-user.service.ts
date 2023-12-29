import { injectable } from 'inversify'
import { UpdateLastActiveMemberCommand } from './update-last-active-by-auth-user.command'
import { ForbiddenException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { MemberServiceBase } from '../../member.base.service'

type Return = void
export type UpdateLastActiveMemberServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(UpdateLastActiveMemberCommand)
export class UpdateLastActiveMemberService extends MemberServiceBase<UpdateLastActiveMemberCommand, Return> {
  async executeImpl(command: UpdateLastActiveMemberCommand): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserId(command.authUserId)
    if (!authMember) throw new NotFoundException()

    authMember.updateLastActive()

    await this.memberRepo.save(authMember)
  }
}
