import { injectable } from 'inversify'
import { UpdateMessageCommand } from './command'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { MessageServiceBase } from '../../base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'

type Return = void
export type UpdateMessageServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(UpdateMessageCommand)
export class UpdateMessageService extends MessageServiceBase<UpdateMessageCommand, Return> {
  async executeImpl(command: UpdateMessageCommand): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserId(command.userId)
    if (!authMember) throw new NotFoundException('Member not found')

    const message = await this.messageRepo.findOneById(command.messageId)
    if (!message) throw new NotFoundException('Message not found')

    this.messageService.updateMessage(message, authMember, command)

    await this.messageRepo.save(message)
  }
}
