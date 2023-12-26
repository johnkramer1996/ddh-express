import { injectable } from 'inversify'
import { QueryMapper } from '../../../../shared/domain/mapper-query.interface'
import { MessageQuery } from '../../domain/entity/message/query'
import { MessageModelAttributes } from '../../domain/entity/message/types'
import { MessageResponseDto } from '../../dtos/message/response.dto'

@injectable()
export class MessageQueryMapper implements QueryMapper<MessageQuery, MessageModelAttributes, MessageResponseDto> {
  public toQuery(record: MessageModelAttributes): MessageQuery {
    return new MessageQuery({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      fromMemberId: record.fromMemberId,
      toMemberId: record.toMemberId,
      message: record.message,
      isRead: record.isRead,
    })
  }

  public toResponse(query: MessageQuery): MessageResponseDto {
    return new MessageResponseDto({
      id: query.id,
      createdAt: query.createdAt,
      updatedAt: query.updatedAt,
      fromMemberId: query.fromMemberId,
      toMemberId: query.toMemberId,
      message: query.message,
      isRead: query.isRead,
    })
  }
}
