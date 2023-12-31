import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindMemberByLoginQuery } from './find-member-by-login.query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { MemberServiceQueryBase } from '../../member.base.service'
import { MemberQuery } from '@src/modules/forum/domain/entity/member/member.query'

type FindMemberServiceReturn = MemberQuery
export type FindMemberByLoginServiceResponse = ResultWithError<FindMemberServiceReturn>

@injectable()
@QueryHandler(FindMemberByLoginQuery)
export class FindMemberByLoginService extends MemberServiceQueryBase<FindMemberByLoginQuery, FindMemberServiceReturn> {
  protected async executeImpl(query: FindMemberByLoginQuery): Promise<FindMemberServiceReturn> {
    const entity = await this.memberRepo.findOneByLogin(query.login)
    if (!entity) throw new NotFoundException()

    return entity
  }
}
