import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'
import { Slug } from './value-objects/slug.value-object'

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
  user?: { [key: string]: any }
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
  deletedAt: Date | null
}

export enum PostType {
  text = 'text',
  link = 'link',
}
