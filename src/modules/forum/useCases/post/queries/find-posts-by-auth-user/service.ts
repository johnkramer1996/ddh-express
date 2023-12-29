import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { FindPostsByAuthUserQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceQueryBase } from '../../base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { PostQuery } from '@src/modules/forum/domain/entity/post/post.query'

type Return = Paginated<PostQuery>
export type FindPostsServiceByUserResponse = ResultWithError<Return>

@injectable()
@QueryHandler(FindPostsByAuthUserQuery)
export class FindPostsByAuthUserService extends PostServiceQueryBase<FindPostsByAuthUserQuery, Return> {
  async executeImpl(query: FindPostsByAuthUserQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserId(query.authUserId)
    if (!authMember) throw new NotFoundException()

    const posts = await this.postRepo.findAllPaginated(query)

    return posts
  }
}
