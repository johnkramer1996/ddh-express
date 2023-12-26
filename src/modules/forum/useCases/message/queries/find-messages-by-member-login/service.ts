import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindMessagesByLoginQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { MessageServiceQueryBase } from '../../base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { MessageQuery } from '@src/modules/forum/domain/entity/message/query'

type Return = Paginated<MessageQuery>
export type FindPostsServiceByUserResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindMessagesByLoginQuery)
export class FindMessagesByLoginService extends MessageServiceQueryBase<FindMessagesByLoginQuery, Return> {
  async executeImpl(query: FindMessagesByLoginQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserId(query.authUserId)
    if (!authMember) throw new NotFoundException()

    const toMember = await this.memberRepo.findOneByLogin(query.login)
    if (!toMember) throw new NotFoundException()

    const messages = await this.messageRepo.findAllPaginatedByFromMemberAndToMember(query, authMember.id, toMember.id)

    return messages
  }
}
