import { VoteEntity } from '../vote.base.entity'
import { CommentVoteEntityCreationProps, CommentVoteEntityProps } from './types'

export class CommentVoteEntity extends VoteEntity<CommentVoteEntityProps> {
  static create(create: CommentVoteEntityCreationProps): CommentVoteEntity {
    const props: CommentVoteEntityProps = { ...create }
    const item = new CommentVoteEntity({ props })
    // item.addEvent(new PostCreatedDomainEvent({ entity: post }))
    return item
  }
}
