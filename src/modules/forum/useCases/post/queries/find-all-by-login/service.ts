import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { PostFindAllByLoginQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceBase } from '../../base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { PostResponseDto } from '@src/modules/forum/dtos/post/response.dto'

type Return = Paginated<PostResponseDto>
export type FindPostsServiceByUserResponse = ResultWithError<Return>

@injectable()
@QueryHandler(PostFindAllByLoginQuery)
export class PostFindAllByLoginService extends PostServiceBase<PostFindAllByLoginQuery, Return> {
  async executeImpl(query: PostFindAllByLoginQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserIdIfExists(query.userId)

    const member = await this.memberRepo.findOneByLogin(query.login)
    if (!member) throw new NotFoundException()

    const posts = await this.postRepo.findAllPaginatedByMemberIdQuery({ ...query, memberId: member.id }, authMember?.id)

    return posts
  }
}
