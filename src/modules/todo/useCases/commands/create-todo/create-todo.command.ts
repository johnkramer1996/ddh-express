import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CreateTodoServiceResponse } from './create-todo.service'

type CreateTodoCommandProps = {
  readonly text: string
  readonly completed?: boolean
}

export class CreateTodoCommand implements ICommand<CreateTodoServiceResponse> {
  declare response?: CreateTodoServiceResponse
  readonly text: string
  readonly completed: boolean

  constructor(props: CreateTodoCommandProps) {
    this.text = props.text
    this.completed = props.completed ?? false
  }
}
