import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'
import { PostVotes, Votes } from '../../value-objects/votes.value-objcect'
import { Slug } from '../../value-objects/slug.value-object'
import { PostVoteModelAttributes } from '../post-vote/types'
import { CommentModelAttributes } from '../comments/types'
import { AggregateID } from '@src/shared/domain/entity'

export interface PostEntityCreationProps {
  memberId: AggregateID
  type: PostType
  title: string
  text: string | null
  link: string | null
  slug: Slug
}

export interface PostEntityProps extends PostEntityCreationProps {
  points: number
  totalNumComments: number
  // comments: PostComments
  // commentIds: AggregateID[]
  votes: PostVotes
}

export interface PostModelCreationAttributes extends PrimaryKey {
  memberId: string
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
