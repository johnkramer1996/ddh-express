import { PrimaryKey } from '@src/shared/core/primary-key'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { AggregateID } from '@src/shared/domain/entity'
import { Slug } from '../../value-objects/slug.value-object'
import { PostVotes } from '../../value-objects/votes.value-objcect'
import { CommentModelAttributes } from '../comment/comment.types'
import { MemberModelAttributes } from '../member/member.types'
import { PostVoteModelAttributes } from '../post-vote/post-vote-types'

export interface PostEntityCreationProps {
  memberId: AggregateID
  image: string
  title: string
  text: string
  slug: Slug
  status: PostStatus
}

export interface PostEntityProps extends PostEntityCreationProps {
  points: number
  totalNumComments: number
  votes: PostVotes
  moderatedAt: Date | null
}

export interface PostModelCreationAttributes extends PrimaryKey {
  memberId: string
  image: string
  title: string
  text: string
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

export type UpdatePostProps = {
  status?: PostStatus
  image?: string
  title?: string
  text?: string
}

export type PostStatus = 'publish' | 'pending' | 'draft' | 'trash'

export const PostStatusEnum: PostStatus[] = ['publish', 'pending', 'draft', 'trash']
