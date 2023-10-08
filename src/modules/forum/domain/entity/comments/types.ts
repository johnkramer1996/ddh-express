import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { CommentVoteModelAttributes } from '../comment-vote/types'
import { CommentVotes } from '../../value-objects/votes.value-objcect'

export interface CommentEntityCreationProps {
  text: string
  postId: string
  userId: string
}

export interface CommentEntityProps extends CommentEntityCreationProps {
  votes: CommentVotes
}

export interface CommentModelCreationAttributes extends PrimaryKey {
  text: string
  postId: string
  userId: string
}

export interface CommentModelAttributes extends CommentModelCreationAttributes, TimeStamp {
  votes?: CommentVoteModelAttributes[]
}
