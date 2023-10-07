import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'

export interface CommentEntityCreationProps {
  text: string
  postId: string
  userId: string
}

export interface CommentEntityProps extends CommentEntityCreationProps {}

export interface CommentModelCreationAttributes extends PrimaryKey {
  text: string
  postId: string
  userId: string
}

export interface CommentModelAttributes extends CommentModelCreationAttributes, TimeStamp {}
