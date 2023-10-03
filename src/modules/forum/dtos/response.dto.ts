import { ResponseBase, ResponseBaseProps } from '../../../shared/api/response.base'

export class PostResponseDto extends ResponseBase {
  public readonly text: string
  public readonly user?: any

  constructor(props: ResponseBaseProps<PostResponseDto>) {
    super(props)
    this.text = props.text
    this.user = props.user
  }
}
