import { DomainEvent, DomainEventProps } from '../../../../shared/domain/events/domain-event.base'
import { TodoEntity } from '../todo.entity'
import { Text } from '../value-objects/text.value-object'

export class TodoTextChangedDomainEvent extends DomainEvent {
  declare entity: TodoEntity
  public readonly oldText: Text
  public readonly newText: Text

  constructor(props: DomainEventProps<TodoTextChangedDomainEvent>) {
    super(props)
    this.oldText = props.oldText
    this.newText = props.newText
  }
}
