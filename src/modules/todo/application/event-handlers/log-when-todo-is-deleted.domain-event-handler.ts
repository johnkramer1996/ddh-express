import { injectable } from 'inversify'
import { TodoCreatedDomainEvent } from '../../domain/events/created.domain-event'
import { OnEvent } from '@src/shared/domain/events/on-event'
import { TodoDeletedDomainEvent } from '../../domain/events/deleted.domain-event'

@injectable()
export class LogWhenTodoIsDeletedDomainEventHandler {
  @OnEvent(TodoDeletedDomainEvent.name)
  async handle(event: TodoDeletedDomainEvent): Promise<any> {
    console.log('LogWhenTodoIsDeletedDomainEventHandler')
  }
}
