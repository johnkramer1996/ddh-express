import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { FindMemberByLoginQuery } from './query'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { MemberServiceBase } from '../../base.service'
import { MemberEntity } from '@src/modules/forum/domain/entity/member/entity'

type FindMemberServiceReturn = MemberEntity
export type FindMemberByLoginServiceResponse = ResultWithError<FindMemberServiceReturn>

@injectable()
@QueryHandler(FindMemberByLoginQuery)
export class FindMemberLoginService extends MemberServiceBase<FindMemberByLoginQuery, FindMemberServiceReturn> {
  protected async executeImpl(query: FindMemberByLoginQuery): Promise<FindMemberServiceReturn> {
    const entity = await this.memberRepo.findOneByLoginDetail(query.login)
    if (!entity) throw new NotFoundException()

    return entity
  }
}
