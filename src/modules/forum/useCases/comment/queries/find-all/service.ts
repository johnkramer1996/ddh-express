import { ResultWithError } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import { injectable } from 'inversify'
import { CommentFindAllQuery } from './query'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { CommentServiceBase } from '../../base.service'
import { CommentEntity } from '@src/modules/forum/domain/entity/comments/entity'
import { AttributeStrategyPort, IncludeStrategyPort } from '@src/shared/domain/repository.port'
import { CommentByPostSlugIncludeStrategy } from '@src/modules/forum/repository/comment/include-strategies/CommentByPostSlugIncludeStrategy'
import { CommentVotesIncludeStrategy } from '@src/modules/forum/repository/comment/include-strategies/CommentVotesIncludeStrategy'
import { CommentUserIncludeStrategy } from '@src/modules/forum/repository/comment/include-strategies/CommentUserIncludeStrategy'
import { CommentCountChildAttributeStrategy } from '@src/modules/forum/repository/comment/attribute-strategies/CommentCountChildAttributeStrategy'
import { CommentCountLikesAttributeStrategy } from '@src/modules/forum/repository/comment/attribute-strategies/CommentCountLikesAttributeStrategy'

type Return = Paginated<CommentEntity>
export type CommentFindAllServiceResponse = ResultWithError<Return>

@injectable()
@QueryHandler(CommentFindAllQuery)
export class CommentFindAllService extends CommentServiceBase<CommentFindAllQuery, Return> {
  async executeImpl(query: CommentFindAllQuery): Promise<Return> {
    const entities = await this.commentRepo.findAllPaginated(query)

    return entities
  }
}

// public class FindPremiumAccountsByManagerQuery : IQuery<FindPremiumAccountsByManagerContext, User>
// {

//     public User Ask(FindPremiumAccountsByManagerContext context)
//     {
//         return session.Query<User>()…;
//     }
// }
// FindAccountByEmailQuery
