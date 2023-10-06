import { TimeStamp } from '@src/shared/core/time-stamp'
import { VoteEntityCreationProps, VoteModelCreationAttributes, VoteEntity } from './vote.entity'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { PostEntity } from './post.entity'

export interface PostVoteEntityCreationProps extends VoteEntityCreationProps {
  // ??
  // post
  // member
  userId: string
  postId: string
}

export interface PostVoteEntityProps extends PostVoteEntityCreationProps {}

export interface PostVoteModelCreationAttributes extends VoteModelCreationAttributes {
  userId: string
  postId: string
}

export interface PostVoteModelAttributes extends PostVoteModelCreationAttributes, TimeStamp {}

export class PostVoteEntity extends VoteEntity {
  static create(create: PostVoteEntityCreationProps): VoteEntity {
    const props: PostVoteEntityProps = { ...create }
    const item = new PostVoteEntity({ props })
    // item.addEvent(new PostCreatedDomainEvent({ entity: post }))
    return item
  }
}
