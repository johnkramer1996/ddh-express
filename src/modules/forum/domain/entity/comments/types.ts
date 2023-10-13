import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { CommentVoteModelAttributes } from '../comment-vote/types'
import { CommentVotes } from '../../value-objects/votes.value-objcect'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'
import { UserEntity } from '@src/modules/user/domain/user.entity'
import { CommentEntity } from './entity'

export interface CommentEntityCreationProps {
  parentId: string | null
  postId: string
  memberId: string
  text: string
  points: number
}

export interface CommentEntityProps extends CommentEntityCreationProps {
  votes: CommentVotes
  user: UserEntity | null
  childCount?: number
  children?: CommentEntity[]
}

export interface CommentModelCreationAttributes extends PrimaryKey {
  parentId: string | null
  postId: string
  memberId: string
  text: string
  points: number
}

export interface CommentModelAttributes extends CommentModelCreationAttributes, TimeStamp {
  votes?: CommentVoteModelAttributes[]
  user?: UserModelAttributes
  childCount?: number
}
