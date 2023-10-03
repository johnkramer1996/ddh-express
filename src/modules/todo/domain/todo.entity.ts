import { v4 } from 'uuid'
import { AggregateRoot } from '../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../shared/domain/entity'
import { TodoCreatedDomainEvent } from './events/created.domain-event'
import { TodoTextChangedDomainEvent } from './events/text-changed.domain-event'
import { TodoDeletedDomainEvent } from './events/deleted.domain-event'
import { TodoEntityProps, TodoEntityCreationProps } from './todo.types'
import { UpdateTextProps } from './value-objects/text.value-object'

export class TodoEntity extends AggregateRoot<TodoEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: TodoEntityCreationProps): TodoEntity {
    const id = v4()

    const props: TodoEntityProps = { ...create, completed: create.completed }
    const user = new TodoEntity({ id, props })
    user.addEvent(new TodoCreatedDomainEvent({ entity: user }))

    return user
  }

  public delete(): void {
    this.addEvent(new TodoDeletedDomainEvent({ entity: this }))
  }

  public updateText(props: UpdateTextProps): void {
    if (props.text === this.props.text) return

    const newText = props.text
    this.addEvent(new TodoTextChangedDomainEvent({ entity: this, oldText: this.props.text, newText }))
    this.props.text = newText
  }

  public updateCompleted(completed: boolean): void {
    if (completed === this.props.completed) return

    this.props.completed = completed
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
