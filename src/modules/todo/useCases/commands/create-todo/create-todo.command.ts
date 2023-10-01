import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateTodoServiceResponse } from './create-todo.service'

export class CreateTodoCommand implements ICommand<CreateTodoServiceResponse> {
  readonly text: string
  readonly completed?: boolean

  constructor(props: CreateTodoCommand) {
    this.text = props.text
    this.completed = props.completed
  }
}
