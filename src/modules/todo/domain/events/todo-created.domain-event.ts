import { DomainEvent, DomainEventProps } from '../../../../shared/domain/events/domain-event.base'
import { TodoEntity } from '../todo.entity'

export class TodoCreatedDomainEvent extends DomainEvent {
  declare entity: TodoEntity

  constructor(props: DomainEventProps<TodoCreatedDomainEvent>) {
    super(props)
  }
}
