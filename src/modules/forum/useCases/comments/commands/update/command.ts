import { ICommand } from '@src/shared/core/cqs/command.interface'
import { CommentUpdateServiceResponse } from './service'

export class CommentUpdateCommand implements ICommand<CommentUpdateServiceResponse> {
  declare response?: CommentUpdateServiceResponse
  readonly todoId: string
  readonly text?: string
  readonly completed?: boolean

  constructor(props: CommentUpdateCommand) {
    this.todoId = props.todoId
    this.text = props.text
    this.completed = props.completed
  }
}
