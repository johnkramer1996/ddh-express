import { TimeStamp } from '@src/shared/core/time-stamp'
import { VoteEntityCreationProps, VoteModelCreationAttributes } from '../vote.base.entity'

export interface CommentVoteEntityCreationProps extends VoteEntityCreationProps {
  memberId: string
  commentId: string
}

export interface CommentVoteEntityProps extends CommentVoteEntityCreationProps {}

export interface CommentVoteModelCreationAttributes extends VoteModelCreationAttributes {
  memberId: string
  commentId: string
}

export interface CommentVoteModelAttributes extends CommentVoteModelCreationAttributes, TimeStamp {}
