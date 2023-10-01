import { ICommand } from '@src/shared/core/cqs/command.interface'
import { UpdateTodoServiceResponse } from './update-todo.service'

export class UpdateTodoCommand implements ICommand<UpdateTodoServiceResponse> {
  readonly todoId: string
  readonly text?: string
  readonly completed?: boolean

  constructor(props: UpdateTodoCommand) {
    this.todoId = props.todoId
    this.text = props.text
    this.completed = props.completed
  }
}
