import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class CommentResponseDto extends ResponseBase {
  public readonly text: string
  public readonly user?: any

  constructor(props: ResponseBaseProps<CommentResponseDto>) {
    super(props)
    this.text = props.text
  }
}
