export class CreateTodoCommand {
  readonly text: string
  readonly completed?: boolean

  constructor(props: CreateTodoCommand) {
    this.text = props.text
    this.completed = props.completed
  }
}
