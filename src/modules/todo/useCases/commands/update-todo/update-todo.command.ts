export class UpdateTodoCommand {
  readonly todoId: string
  readonly text?: string
  readonly completed?: boolean

  constructor(props: UpdateTodoCommand) {
    this.todoId = props.todoId
    this.text = props.text
    this.completed = props.completed
  }
}
