import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'
import { PostVotes, Votes } from '../../value-objects/votes.value-objcect'
import { Slug } from '../../value-objects/slug.value-object'
import { PostVoteModelAttributes } from '../post-vote/types'
import { CommentModelAttributes } from '../comments/types'
import { CommentEntity } from '../comments/entity'
import { PostComments } from '../../value-objects/comments.value-objcect'
import { UserEntity } from '@src/modules/user/domain/user.entity'

export interface PostEntityCreationProps {
  type: PostType
  title: string
  text: string | null
  link: string | null
  slug: Slug
  userId: string
  // comments: Comments
  // dateTimePosted?: string | Date;
}

export interface PostEntityProps extends PostEntityCreationProps {
  points: number
  totalNumComments: number
  comments: PostComments
  votes: PostVotes
  user: UserEntity | null
}

export interface PostModelCreationAttributes extends PrimaryKey {
  userId: string
  type: string
  title: string
  text: string | null
  link: string | null
  slug: string
  points: number
  totalNumComments: number
}

export interface PostModelAttributes extends PostModelCreationAttributes, TimeStamp {
  user?: UserModelAttributes
  comments?: CommentModelAttributes[]
  votes?: PostVoteModelAttributes[]
}

export enum PostType {
  text = 'text',
  link = 'link',
}
