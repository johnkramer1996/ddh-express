import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindCommentsQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommentServiceQueryBase } from '../../base.service'
import { CommentQuery } from '@src/modules/forum/domain/entity/comments/query'

type Return = Paginated<CommentQuery>
export type CommentFindAllServiceResponse = ResultWithError<Return>

// SearchCustomerQueryHandler
@injectable()
@QueryHandler(FindCommentsQuery)
export class FindCommentsQueryHandler extends CommentServiceQueryBase<FindCommentsQuery, Return> {
  async executeImpl(query: FindCommentsQuery): Promise<Return> {
    const authMember = await this.memberRepository.findOneByUserIdIfExists(query.userId)

    const paginated = await this.commentRepository.findAllPaginatedBySlug(query, query.slug, authMember?.id)

    return paginated
  }
}
