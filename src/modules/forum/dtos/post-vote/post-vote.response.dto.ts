import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class PostVoteResponseDto extends ResponseBase {
  public readonly memberId: string
  public readonly postId: string
  public readonly type: string

  constructor(props: ResponseBaseProps<PostVoteResponseDto>) {
    super(props)
    this.memberId = props.memberId
    this.postId = props.postId
    this.type = props.type
  }
}
