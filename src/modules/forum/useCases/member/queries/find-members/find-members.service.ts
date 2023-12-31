import { Result, ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindMembersQuery } from './find-members.query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { MemberServiceQueryBase } from '../../member.base.service'
import { MemberQuery } from '@src/modules/forum/domain/entity/member/member.query'

type Return = Paginated<MemberQuery>
export type FindMembersServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindMembersQuery)
export class FindMembersService extends MemberServiceQueryBase<FindMembersQuery, Return> {
  async executeImpl(query: FindMembersQuery): Promise<Return> {
    const members = await this.memberRepo.findAllPaginated(query, { distinct: false })

    return members
  }
}
