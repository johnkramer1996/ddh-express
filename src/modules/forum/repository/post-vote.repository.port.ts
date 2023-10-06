import { RepositoryPort } from '../../../shared/domain/repository.port'
import { VoteEntity } from '../domain/vote.entity'

export interface PostVoteRepositoryPort extends RepositoryPort<VoteEntity> {
  findOneByPostIdAndUserId(postId: string, userId: string): Promise<VoteEntity | null>
}
