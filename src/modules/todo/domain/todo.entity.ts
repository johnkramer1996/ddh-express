import { v4 } from 'uuid'
import { AggregateRoot } from '../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../shared/domain/entity'
import { TodoCreatedDomainEvent } from './events/todo-created.domain-event'
import { Text } from './value-objects/text.value-object'
import { TodoTextChangedDomainEvent } from './events/todo-text-changed.domain-event'

export interface CreateTodoProps {
  text: Text
  completed?: boolean
}

export interface TodoProps extends CreateTodoProps {
  completed: boolean
}

export interface UpdateTodoTextProps {
  text: Text
}

export class TodoEntity extends AggregateRoot<TodoProps> {
  protected readonly _id!: AggregateID

  static create(create: CreateTodoProps): TodoEntity {
    const id = v4()

    const props: TodoProps = { ...create, completed: create.completed ?? false }
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

  public changeText(props: UpdateTodoTextProps): void {
    if (props.text === this.props.text) return

    const newText = props.text
    this.addEvent(new TodoTextChangedDomainEvent({ entity: this, oldText: this.props.text, newText }))
    this.props.text = newText
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
