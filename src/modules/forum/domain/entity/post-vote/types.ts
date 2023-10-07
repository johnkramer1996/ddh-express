import { TimeStamp } from '@src/shared/core/time-stamp'
import { VoteEntityCreationProps, VoteModelCreationAttributes } from '../vote.base.entity'

export interface PostVoteEntityCreationProps extends VoteEntityCreationProps {
  userId: string
  postId: string
}

export interface PostVoteEntityProps extends PostVoteEntityCreationProps {}

export interface PostVoteModelCreationAttributes extends VoteModelCreationAttributes {
  userId: string
  postId: string
}

export interface PostVoteModelAttributes extends PostVoteModelCreationAttributes, TimeStamp {}
