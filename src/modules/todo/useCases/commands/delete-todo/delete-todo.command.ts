export class DeleteTodoCommand {
  readonly todoId: string

  constructor(props: DeleteTodoCommand) {
    this.todoId = props.todoId
  }
}
