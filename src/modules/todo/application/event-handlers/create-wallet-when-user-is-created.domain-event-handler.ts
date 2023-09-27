import { injectable } from 'inversify'
import { TodoCreatedDomainEvent } from '../../domain/events/todo-created.domain-event'
import { OnEvent } from '@src/shared/domain/events/on-event'

@injectable()
export class CreateWalletWhenUserIsCreatedDomainEventHandler {
  @OnEvent(TodoCreatedDomainEvent.name)
  async handle(event: TodoCreatedDomainEvent): Promise<any> {
    console.log('TodoCreatedDomainEvent', event)
  }
}
