import { TimeStamp } from '@src/shared/core/time-stamp'
import { VoteEntityCreationProps, VoteModelCreationAttributes } from '../vote.base.entity'

// TODO:
// Don’t introduce a class for that table if it only contains references to related tables.
// Do introduce a class for that table if it contains any other information. In this case, convert the many-to-many relationship into two one-to-many relationships.

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
