import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { CommentVoteModelAttributes } from '../comment-vote/types'
import { CommentVotes } from '../../value-objects/votes.value-objcect'
import { MemberModelWithAdditonAttributes } from '../member/types'

// TODO:
// POST ID -> VALUE OBJECT
export interface CommentEntityCreationProps {
  parentId: string | null
  postId: string
  memberId: string
  text: string
  points: number
}

export interface CommentEntityProps extends CommentEntityCreationProps {
  votes: CommentVotes
}

export interface CommentModelCreationAttributes extends PrimaryKey {
  parentId: string | null
  postId: string
  memberId: string
  text: string
  points: number
}

export interface CommentModelAttributes extends CommentModelCreationAttributes, TimeStamp {}

export interface CommentModelAdditionalAttribute extends CommentModelAttributes {
  countChild: number
  member: MemberModelWithAdditonAttributes
  votes?: CommentVoteModelAttributes[]
  children?: CommentModelAttributes[]
}
