import { injectable } from 'inversify'
import { PostEntity } from '../entity/post/post.entity'
import { ArgumentInvalidException, ForbiddenException } from '@src/shared/exceptions/exceptions'
import { MemberEntity } from '../entity/member/member.entity'
import { UpdatePostProps } from '../entity/post/post.types'
import { MessageEntity } from '../entity/message/entity'
import { UpdateMessageProps } from '../entity/message/types'

@injectable()
export class MessageService {
  public createMessage(fromMember: MemberEntity, toMember: MemberEntity, message: string): MessageEntity {
    if (fromMember.id === toMember.id) throw new ArgumentInvalidException('you cannot send to yourself')

    return MessageEntity.create({
      fromMemberId: fromMember.id,
      toMemberId: toMember.id,
      message: message,
    })
  }

  public updateMessage(message: MessageEntity, member: MemberEntity, update: UpdateMessageProps): void {
    if (update.message != null && !(message.fromMemberId === member.id)) throw new ForbiddenException()
    if (update.isRead != null && !(message.toMemberId === member.id)) throw new ForbiddenException()

    message.update(update)
  }
}
