import { v4 } from 'uuid'
import { AggregateRoot } from '../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../shared/domain/entity'
import { TodoCreatedDomainEvent } from './events/todo-created.domain-event'
import { TodoTextChangedDomainEvent } from './events/todo-text-changed.domain-event'
import { TodoDeletedDomainEvent } from './events/todo-deleted.domain-event'
import { TodoProps, TodoCreationProps, TodoUpdateTextProps } from './todo.types'

export class TodoEntity extends AggregateRoot<TodoProps> {
  protected readonly _id!: AggregateID

  static create(create: TodoCreationProps): TodoEntity {
    const id = v4()

    const props: TodoProps = { ...create, completed: create.completed }
    const user = new TodoEntity({ id, props })
    user.addEvent(new TodoCreatedDomainEvent({ entity: user }))

    return user
  }

  get text(): string {
    return this.props.text.value
  }

  get completed(): boolean {
    return this.props.completed
  }

  public delete(): void {
    this.addEvent(new TodoDeletedDomainEvent({ entity: this }))
  }

  public updateText(props: TodoUpdateTextProps): void {
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
