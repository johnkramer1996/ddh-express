import { PrimaryKey } from '@src/shared/core/primary-key'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { AggregateID } from '@src/shared/domain/entity'
import { Slug } from '../../value-objects/slug.value-object'
import { PostVotes } from '../../value-objects/votes.value-objcect'
import { CommentModelAttributes } from '../comments/types'
import { MemberModelAttributes } from '../member/types'
import { PostVoteModelAttributes } from '../post-vote/types'

export interface PostEntityCreationProps {
  memberId: AggregateID
  type: PostType
  image: string
  title: string
  text: string | null
  link: string | null
  slug: Slug
}

export interface PostEntityProps extends PostEntityCreationProps {
  points: number
  totalNumComments: number
  votes: PostVotes
  status: PostStatus
  moderatedAt: Date | null
}

export interface PostModelCreationAttributes extends PrimaryKey {
  memberId: string
  image: string
  type: PostType
  title: string
  text: string | null
  link: string | null
  slug: string
  points: number
  totalNumComments: number
  status: PostStatus
  moderatedAt: Date | null
}

export interface PostModelAttributes extends PostModelCreationAttributes, TimeStamp {
  member?: MemberModelAttributes
  comments?: CommentModelAttributes[]
  votes?: PostVoteModelAttributes[]
}

export enum PostType {
  text = 'text',
  link = 'link',
}

export type UpdatePostProps = {
  image?: string
  title?: string
  text?: string
}

export type PostStatus = 'approved' | 'cancelled' | 'draft'
