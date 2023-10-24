import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { inject, injectable } from 'inversify'
import { FindCommentsQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommentServiceQueryBase } from '../../base.service'
import { CommentResponseDto } from '@src/modules/forum/dtos/comment/response.dto'
import { CommentSequelizeRepositoryQuery } from '@src/modules/forum/repository/comment/repository.sequelize'
import { MemberSequelizeRepositoryQuery } from '@src/modules/forum/repository/member/repository.sequelize'
import { COMMENT_TYPES } from '@src/modules/forum/di/comment/comment.types'
import { CommentQueryMapper } from '@src/modules/forum/mappers/comment/mapper-query'
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
    // That data will be returned in a DTO which will be injected  into a ViewModel.

    return paginated
  }
}
