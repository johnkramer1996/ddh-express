import { TimeStamp } from '@src/shared/core/time-stamp'
import { VoteEntityCreationProps, VoteModelCreationAttributes } from '../vote.base.entity'

export interface PostVoteEntityCreationProps extends VoteEntityCreationProps {
  memberId: string
  postId: string
}

export interface PostVoteEntityProps extends PostVoteEntityCreationProps {}

export interface PostVoteModelCreationAttributes extends VoteModelCreationAttributes {
  memberId: string
  postId: string
}

export interface PostVoteModelAttributes extends PostVoteModelCreationAttributes, TimeStamp {}
