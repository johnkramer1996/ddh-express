import { ResponseBase, ResponseBaseProps } from '../../../shared/api/response.base'

export class TodoResponseDto extends ResponseBase {
  public readonly text: string
  public readonly completed: boolean

  constructor(props: ResponseBaseProps<TodoResponseDto>) {
    super(props)
    this.text = props.text
    this.completed = props.completed
  }
}
