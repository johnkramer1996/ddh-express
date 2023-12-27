import { injectable } from 'inversify'
import { BanMemberCommand } from './command'
import { ForbiddenException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { MemberServiceBase } from '../../base.service'

type Return = void
export type BanMemberServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(BanMemberCommand)
export class BanMemberService extends MemberServiceBase<BanMemberCommand, Return> {
  async executeImpl(command: BanMemberCommand): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserId(command.authUserId)
    if (!authMember) throw new NotFoundException()

    const member = await this.memberRepo.findOneByLogin(command.login)
    if (!member) throw new NotFoundException()

    // TODO: ADD PERMISSION TO MEMBER  AND CHECK THEM HERE

    command.action === 'ban' ? member.ban(authMember) : member.recover(authMember)

    await this.memberRepo.save(member)
  }
}
