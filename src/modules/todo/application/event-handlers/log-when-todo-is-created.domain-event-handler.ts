import { injectable } from 'inversify'
import { TodoCreatedDomainEvent } from '../../domain/events/created.domain-event'
import { OnEvent } from '@src/shared/domain/events/on-event'

@injectable()
export class LogWhenTodoIsCreatedDomainEventHandler {
  @OnEvent(TodoCreatedDomainEvent.name)
  async handle(event: TodoCreatedDomainEvent): Promise<any> {
    console.log('[LogWhenTodoIsCreatedDomainEventHandler]: LogWhenTodoIsCreatedDomainEventHandler')
  }
}
