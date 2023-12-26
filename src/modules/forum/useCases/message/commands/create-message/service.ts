import { injectable } from 'inversify'
import { CreateMessageCommand } from './command'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { MessageServiceBase } from '../../base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { MessageEntity } from '@src/modules/forum/domain/entity/message/entity'

type Return = AggregateID
export type CreateMessageServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CreateMessageCommand)
export class CreateMessageService extends MessageServiceBase<CreateMessageCommand, Return> {
  async executeImpl(command: CreateMessageCommand): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserId(command.userId)
    if (!authMember) throw new NotFoundException('Member not found')

    const toMember = await this.memberRepo.findOneById(command.toMemberId)
    if (!toMember) throw new NotFoundException('Member not found')

    const message = this.messageService.createMessage(authMember, toMember, command.message)

    await this.messageRepo.save(message)

    return message.id
  }
}
