import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'

export interface PostEntityCreationProps {
  type: PostType
  title: string
  text: string | null
  link: string | null
  slug: string
  // comments: Comments
  // dateTimePosted?: string | Date;
}

export interface PostEntityProps extends PostEntityCreationProps {
  points: number
  totalNumComments: number
  user?: { [key: string]: any }
}

export interface PostModelCreationAttributes extends PrimaryKey {
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
}

export enum PostType {
  text = 'text',
  link = 'link',
}
