import { RepositoryPort } from '@src/shared/domain/repository.port'
import { PostVoteEntity } from '../../domain/entity/post-vote/entity'

export interface PostVoteRepositoryPort extends RepositoryPort<PostVoteEntity> {
  findOneByPostIdAndMemberId(postId: string, memberId: string): Promise<PostVoteEntity | null>
}
