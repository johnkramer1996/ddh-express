import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { PostFindAllByMemberQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostEntity } from '@src/modules/forum/domain/entity/post/entity'
import { PostServiceBase } from '../../base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'

type Return = Paginated<PostEntity>
export type FindPostsServiceByUserResponse = ResultWithError<Return>

@injectable()
@QueryHandler(PostFindAllByMemberQuery)
export class PostFindAllByMemberService extends PostServiceBase<PostFindAllByMemberQuery, Return> {
  async executeImpl(query: PostFindAllByMemberQuery): Promise<Return> {
    const member = await this.memberRepo.findOneByLoginDetail(query.login)
    if (!member) throw new NotFoundException()

    const entities = await this.postRepo.findAllPaginatedDetailByMemberId({ ...query, memberId: member.id })

    return entities
  }
}
