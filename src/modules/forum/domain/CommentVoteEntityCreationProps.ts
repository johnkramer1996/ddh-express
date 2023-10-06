import { TimeStamp } from '@src/shared/core/time-stamp'
import { VoteEntityCreationProps, VoteModelCreationAttributes, VoteEntity } from './vote.entity'

export interface CommentVoteEntityCreationProps extends VoteEntityCreationProps {
  userId: string
  postId: string
  comemntId: string
}

export interface CommentVoteEntityProps extends CommentVoteEntityCreationProps {}

export interface CommentVoteModelCreationAttributes extends VoteModelCreationAttributes {
  userId: string
  postId: string
  comemntId: string
}

export interface CommentVoteModelAttributes extends CommentVoteModelCreationAttributes, TimeStamp {}

export class CommentVoteEntity extends VoteEntity {
  static create(create: CommentVoteEntityCreationProps): VoteEntity {
    const props: CommentVoteEntityProps = { ...create }
    const item = new CommentVoteEntity({ props })
    // item.addEvent(new PostCreatedDomainEvent({ entity: post }))
    return item
  }
}
