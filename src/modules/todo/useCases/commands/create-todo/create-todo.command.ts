export class CreateUserCommand {
  readonly text: string
  readonly completed?: boolean

  constructor(props: CreateUserCommand) {
    this.text = props.text
    this.completed = props.completed
  }
}
