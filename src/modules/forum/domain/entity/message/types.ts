import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { AggregateID } from '@src/shared/domain/entity'

export interface MessageEntityCreationProps {
  toMemberId: AggregateID
  fromMemberId: AggregateID
  message: string
}

export interface MessageEntityProps extends MessageEntityCreationProps {
  isRead: boolean
}

export interface MessageModelCreationAttributes extends PrimaryKey {
  toMemberId: string
  fromMemberId: string
  message: string
  isRead: boolean
}

export interface MessageModelAttributes extends MessageModelCreationAttributes, TimeStamp {}

export type UpdateMessageProps = {
  message?: string
  isRead?: boolean
}
