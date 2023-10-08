import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class PostVoteResponseDto extends ResponseBase {
  public readonly userId: string
  public readonly postId: string
  public readonly type: string

  constructor(props: ResponseBaseProps<PostVoteResponseDto>) {
    super(props)
    this.userId = props.userId
    this.postId = props.postId
    this.type = props.type
  }
}
