import { VoteEntity } from '../vote.base.entity'
import { PostVoteEntityCreationProps, PostVoteEntityProps } from './types'

export class PostVoteEntity extends VoteEntity<PostVoteEntityProps> {
  static create(create: PostVoteEntityCreationProps): PostVoteEntity {
    const props: PostVoteEntityProps = { ...create }
    const entity = new PostVoteEntity({ props })

    return entity
  }

  validate(): void {}
}
