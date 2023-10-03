import { ResponseBase, ResponseBaseProps } from '../../../shared/api/response.base'

export class PostResponseDto extends ResponseBase {
  public readonly title: string
  public readonly user?: any

  constructor(props: ResponseBaseProps<PostResponseDto>) {
    super(props)
    this.title = props.title
    this.user = props.user
  }
}
