import { AggregateID } from '@src/shared/domain/entity'
import { VoteEntity } from '../vote.base.entity'
import { PostVoteEntityCreationProps, PostVoteEntityProps } from './post-vote-types'

export class PostVoteEntity extends VoteEntity<PostVoteEntityProps> {
  static create(create: PostVoteEntityCreationProps): PostVoteEntity {
    const props: PostVoteEntityProps = { ...create }
    const entity = new PostVoteEntity({ props })

    return entity
  }

  get memberId(): AggregateID {
    return this.props.memberId
  }

  validate(): void {}
}
