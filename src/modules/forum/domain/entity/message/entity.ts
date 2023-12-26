import { AggregateRoot } from '@src/shared/domain/aggregate-root.base'
import { AggregateID } from '@src/shared/domain/entity'
import { MessageEntityCreationProps, MessageEntityProps } from './types'

export class MessageEntity extends AggregateRoot<MessageEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: MessageEntityCreationProps): MessageEntity {
    const props: MessageEntityProps = { ...create, isRead: false }
    const entity = new MessageEntity({ props })

    return entity
  }

  get fromMemberId(): string {
    return this.props.fromMemberId
  }

  get toMemberId(): string {
    return this.props.toMemberId
  }

  public update(updateDto: { message?: string; isRead?: boolean }) {
    this.props.message = updateDto.message ?? this.props.message
    this.props.isRead = updateDto.isRead ?? this.props.isRead
  }

  public validate(): void {}
}
