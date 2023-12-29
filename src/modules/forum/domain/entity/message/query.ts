import { AggregateID } from '@src/shared/domain/entity'
import { ValueObject } from '@src/shared/domain/value-object.base'

interface MessageQueryProps {
  id: string
  createdAt: Date
  updatedAt: Date | null
  fromMemberId: string
  toMemberId: string
  message: string
  isRead: boolean
}

export class MessageQuery extends ValueObject<MessageQueryProps> {
  validate(): void {}

  get id(): AggregateID {
    return this.props.id
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt
  }

  get fromMemberId(): string {
    return this.props.fromMemberId
  }

  get toMemberId(): string {
    return this.props.toMemberId
  }

  get message(): string {
    return this.props.message
  }

  get isRead(): boolean {
    return this.props.isRead
  }
}
