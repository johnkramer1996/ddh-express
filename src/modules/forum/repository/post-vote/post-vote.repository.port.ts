import { RepositoryPort } from '@src/shared/domain/repository.port'
import { PostVoteEntity } from '../../domain/entity/post-vote/entity'

export interface PostVoteRepositoryPort extends RepositoryPort<PostVoteEntity> {
  findOneByPostIdAndUserId(postId: string, userId: string): Promise<PostVoteEntity | null>
}
