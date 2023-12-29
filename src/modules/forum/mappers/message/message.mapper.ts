import { injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { MessageModelAttributes } from '../../domain/entity/message/types'
import { MessageEntity } from '../../domain/entity/message/entity'

@injectable()
export class MessageMapper implements Mapper<MessageEntity, MessageModelAttributes> {
  public toPersistence(entity: MessageEntity): MessageModelAttributes {
    const copy = entity.getProps()
    const record: MessageModelAttributes = {
      id: copy.id,
      fromMemberId: copy.fromMemberId,
      toMemberId: copy.toMemberId,
      message: copy.message,
      isRead: copy.isRead,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      deletedAt: copy.deletedAt,
    }
    return record
  }

  public toDomain(record: MessageModelAttributes): MessageEntity {
    const entity = new MessageEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        fromMemberId: record.fromMemberId,
        toMemberId: record.toMemberId,
        message: record.message,
        isRead: record.isRead,
      },
    })
    return entity
  }
}
