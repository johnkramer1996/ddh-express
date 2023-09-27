import { DomainEvent, DomainEventProps } from '../../../../shared/domain/events/domain-event.base'
import { TodoEntity } from '../todo.entity'

export class TodoDeletedDomainEvent extends DomainEvent {
  declare entity: TodoEntity

  constructor(props: DomainEventProps<TodoDeletedDomainEvent>) {
    super(props)
  }
}
