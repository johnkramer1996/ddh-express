import { injectable } from 'inversify'
import { AddRoleToMemberCommand } from './attach-or-detach-role-to-member.command'
import { ForbiddenException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { MemberServiceBase } from '../../member.base.service'
import { Role } from '@src/modules/forum/domain/value-objects/role.value-object'

type Return = void
export type AddRoleToMemberServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(AddRoleToMemberCommand)
export class AddRoleToMemberService extends MemberServiceBase<AddRoleToMemberCommand, Return> {
  async executeImpl(command: AddRoleToMemberCommand): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserId(command.authUserId)
    if (!authMember) throw new NotFoundException()

    const member = await this.memberRepo.findOneByLogin(command.login)
    if (!member) throw new NotFoundException()

    command.action === 'attachRole'
      ? member.attachRole(authMember, new Role({ value: command.role }))
      : member.detachRole(authMember, new Role({ value: command.role }))

    await this.memberRepo.save(member)
  }
}
