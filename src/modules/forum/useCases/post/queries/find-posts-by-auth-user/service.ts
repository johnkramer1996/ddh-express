import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindPostsByAuthUserQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceQueryBase } from '../../base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { PostQuery } from '@src/modules/forum/domain/entity/post/query'

type Return = Paginated<PostQuery>
export type FindPostsServiceByUserResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindPostsByAuthUserQuery)
export class FindPostsByAuthUserService extends PostServiceQueryBase<FindPostsByAuthUserQuery, Return> {
  async executeImpl(query: FindPostsByAuthUserQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByLogin(query.login)
    if (!authMember) throw new NotFoundException()

    const posts = await this.postRepo.findAllPaginatedWithAuthMeberId({ ...query, memberId: authMember.id }, authMember?.id)

    return posts
  }
}
