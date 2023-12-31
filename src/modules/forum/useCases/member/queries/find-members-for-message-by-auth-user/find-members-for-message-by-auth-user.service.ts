import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindMembersForMessageByAuthUserQuery as FindMembersForMessageByAuthUserQuery } from './find-members-for-message-by-auth-user.query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { MessageServiceQueryBase } from '../../../message/message.base.service'
import { MemberQuery } from '@src/modules/forum/domain/entity/member/member.query'
import { Op } from 'sequelize'

type Return = MemberQuery[]
export type FindMembersForMessageServiceByUserResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindMembersForMessageByAuthUserQuery)
export class FindMembersForMessageByAuthUserService extends MessageServiceQueryBase<FindMembersForMessageByAuthUserQuery, Return> {
  async executeImpl(query: FindMembersForMessageByAuthUserQuery): Promise<Return> {
    const member = await this.memberRepo.findOneByUserId(query.authUserId)
    if (!member) throw new NotFoundException()

    const messages = await this.messageRepo.findAll({
      where: { [Op.or]: [{ fromMemberId: member.id }, { toMemberId: member.id }] },
    })

    const membersIds = messages.map(({ fromMemberId, toMemberId }) => [fromMemberId, toMemberId]).flat()

    const members = await this.memberRepo.findAll({
      where: { id: { [Op.in]: membersIds, [Op.ne]: member.id } },
    })

    return members
  }
}
